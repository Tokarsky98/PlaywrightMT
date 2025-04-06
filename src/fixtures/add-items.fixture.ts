import { Item } from '../models/item.model';
import { pageObjectTest } from './page-object.fixture';
import { expect } from '@playwright/test';

interface TestFixtures {
    itemsDetails: Item[][];
    item: Item;
    items: Item[];
}

export const addItemsTest = pageObjectTest.extend<TestFixtures>({
    // Nested array structure
    itemsDetails: [[new Item()]],

    // Simplified access to first item
    item: async ({ items }, use) => {
        await use(items[0]);
    },

    // Add items to cart and return the successfully added items
    items: async ({ page, inventoryPage, itemsDetails }, use) => {
        const expectedTitle = 'Products';
        await expect(inventoryPage.secondaryHeader.titleSpan).toHaveText(
            expectedTitle,
        );

        const addedItems: Item[] = [];

        // Keep the flattening operation to maintain compatibility
        const flattenedItemsDetails = itemsDetails.flat();

        for (const itemDetail of flattenedItemsDetails) {
            const item = page
                .locator('.inventory_item')
                .filter({ hasText: itemDetail.name });

            const priceOfItem = item
                .locator('.inventory_item_price')
                .filter({ hasText: `$${itemDetail.price}` });

            // Verify item exists with correct price
            await expect(item).toBeVisible();
            await expect(priceOfItem).toBeVisible();

            // Add to cart
            const cartButton = item.getByRole('button');
            await expect(cartButton).toHaveText('Add to cart');
            await cartButton.click();
            await expect(cartButton).toHaveText('Remove');

            // Track added item
            addedItems.push(new Item(itemDetail.name, itemDetail.price));
        }

        await use(addedItems);
    },
});
