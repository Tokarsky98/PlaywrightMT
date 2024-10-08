import { test } from '../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { Inventory } from '../pages/inventory';

test('Check addition and removal of items from the cart', async ({ page }) => {
    const inventory = new Inventory(page);
    const header = inventory.header;
    const inventorySection = inventory.inventorySection;

    const firstItem = 'Sauce Labs Backpack';
    const secondItem = 'Sauce Labs Fleece Jacket';

    await page.goto('/inventory.html');
    await expect(inventorySection.productList).toBeVisible();

    // Add items to the cart and check if they are there
    const addedItems = await inventorySection.actionOnCart('add', [
        firstItem,
        secondItem,
    ]);
    await expect(header.cartBagde).toBeVisible();
    await expect(header.cartBagde).toHaveText(`${addedItems.quantity}`);

    const cartView = await header.clickCartIcon();
    expect(await cartView.cartListSection.getNamesofItems()).toEqual([
        firstItem,
        secondItem,
    ]);

    // Back to the `Inventory` view
    const inventoryView =
        await cartView.cartListSection.clickContinueShoppingButton();

    // Remove items from the cart and check if they are no longer there
    await inventoryView.inventorySection.actionOnCart('remove', [
        firstItem,
        secondItem,
    ]);
    await expect(header.cartBagde).toBeHidden();

    const cartViewAgain = await header.clickCartIcon();
    expect(await cartViewAgain.cartListSection.getNamesofItems()).toEqual([]);
});

test('Check the total price of added items', async ({ page }) => {
    const inventory = new Inventory(page);
    const inventorySection = inventory.inventorySection;

    const firstItem = 'Sauce Labs Bolt T-Shirt';
    const secondItem = 'Sauce Labs Fleece Jacket';

    await page.goto('/inventory.html');
    await expect(inventorySection.productList).toBeVisible();

    const addedItems = await inventorySection.actionOnCart('add', [
        firstItem,
        secondItem,
    ]);

    const totalPrice = await inventorySection.calculateTotalPriceWithoutTax(
        addedItems.names,
    );

    const checkoutStepTwoView = await inventory.goToCheckoutStepTwo();
    await expect(
        checkoutStepTwoView.checkoutStepTwoSection.itemTotal,
    ).toHaveText(`Item total: $${totalPrice}`);
});

test('Check the sorting of items', async ({ page }) => {
    const inventory = new Inventory(page);
    const inventorySection = inventory.inventorySection;
    const secondaryHeader = inventory.secondaryHeader;

    const originalOrderOfNames = await inventorySection.getItemsOrder('name');
    const originalOrderOfPrices = await inventorySection.getItemsOrder('price');

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
