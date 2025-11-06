import { expect, test } from '@_src/fixtures/merge.fixture';
import { itemPairs, testItems } from '@_src/test-data/inventory.data';

test.describe('Inventory - Cart Operations', () => {
    const { twoItems } = itemPairs;

    test('should add and remove items from the cart @logged', async ({
        inventoryPage,
    }) => {
        const { header, inventorySection } = inventoryPage;

        await expect(inventorySection.productList).toBeVisible();

        // Add items to the cart and check if they are there
        const addedItems = await inventorySection.actionOnCart('add', twoItems);
        await expect(header.cartBadge).toBeVisible();
        await expect(header.cartBadge).toHaveText(`${addedItems.quantity}`);

        const cartView = await header.clickCartIcon();
        expect(await cartView.cartListSection.getNamesOfItems()).toEqual(
            twoItems,
        );

        // Back to the `Inventory` view
        const inventoryView =
            await cartView.cartListSection.clickContinueShoppingButton();

        // Remove items from the cart and check if they are no longer there
        await inventoryView.inventorySection.actionOnCart('remove', twoItems);
        await expect(header.cartBadge).toBeHidden();

        const cartViewAgain = await header.clickCartIcon();
        expect(await cartViewAgain.cartListSection.getNamesOfItems()).toEqual(
            [],
        );
    });

    test('should check the total price of added items @logged', async ({
        inventoryPage,
    }) => {
        const inventorySection = inventoryPage.inventorySection;

        await expect(inventorySection.productList).toBeVisible();

        const addedItems = await inventorySection.actionOnCart('add', twoItems);

        const totalPrice = await inventorySection.calculateTotalPriceWithoutTax(
            addedItems.names,
        );

        const checkoutStepTwoView = await inventoryPage.goToCheckoutStepTwo();
        await expect(
            checkoutStepTwoView.checkoutStepTwoSection.itemTotal,
        ).toHaveText(`Item total: $${totalPrice}`);
    });

    test.describe('Edge cases', () => {
        test('should maintain cart state after browser refresh @logged', async ({
            inventoryPage,
            page,
        }) => {
            const { header, inventorySection } = inventoryPage;
            const itemsToAdd = [testItems.backpack];

            // Add item to cart
            await inventorySection.actionOnCart('add', itemsToAdd);
            await expect(header.cartBadge).toHaveText('1');

            // Refresh the page
            await page.reload();

            // Cart should still have the item
            await expect(header.cartBadge).toHaveText('1');

            const cartView = await header.clickCartIcon();
            const cartItems = await cartView.cartListSection.getNamesOfItems();
            expect(cartItems, 'Cart should persist after refresh').toEqual(
                itemsToAdd,
            );
        });
    });
});

test.describe('Inventory - Sorting Functionality', () => {
    test('should check the sorting of items @logged', async ({
        inventoryPage,
    }) => {
        const { inventorySection, secondaryHeader } = inventoryPage;

        const originalOrderOfNames =
            await inventorySection.getItemsOrder('name');
        const originalOrderOfPrices =
            await inventorySection.getItemsOrder('price');

        const sorting: {
            filter: string;
            orderBy: 'name' | 'price';
            expectedOrder: string[][];
        }[] = [
            {
                filter: 'Name (Z to A)',
                orderBy: 'name',
                expectedOrder: [
                    originalOrderOfNames[5],
                    originalOrderOfNames[4],
                    originalOrderOfNames[3],
                    originalOrderOfNames[2],
                    originalOrderOfNames[1],
                    originalOrderOfNames[0],
                ],
            },
            {
                filter: 'Name (A to Z)',
                orderBy: 'name',
                expectedOrder: [
                    originalOrderOfNames[0],
                    originalOrderOfNames[1],
                    originalOrderOfNames[2],
                    originalOrderOfNames[3],
                    originalOrderOfNames[4],
                    originalOrderOfNames[5],
                ],
            },
            {
                filter: 'Price (low to high)',
                orderBy: 'price',
                expectedOrder: [
                    originalOrderOfPrices[4],
                    originalOrderOfPrices[1],
                    originalOrderOfPrices[2],
                    originalOrderOfPrices[5],
                    originalOrderOfPrices[0],
                    originalOrderOfPrices[3],
                ],
            },
            {
                filter: 'Price (high to low)',
                orderBy: 'price',
                expectedOrder: [
                    originalOrderOfPrices[3],
                    originalOrderOfPrices[0],
                    originalOrderOfPrices[5],
                    originalOrderOfPrices[2],
                    originalOrderOfPrices[1],
                    originalOrderOfPrices[4],
                ],
            },
        ];

        for (const { filter, orderBy, expectedOrder } of sorting) {
            await secondaryHeader.filterSelect.selectOption({
                label: filter,
            });

            const selectedFilterText =
                await secondaryHeader.filterActiveOption.textContent();
            expect(selectedFilterText).toContain(filter);

            const presentOrder = await inventorySection.getItemsOrder(orderBy);
            expect(
                presentOrder,
                `Should have the expected order when filtered by: ${filter}`,
            ).toEqual(expectedOrder);
        }
    });
});
