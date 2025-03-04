import { expect } from '@playwright/test';
import { Item } from '../models/item.model';
import { pageObjectTest } from './page-object.fixture';

interface TestFixtures {
    itemsDetails: Item[];
    item: Item;
    items: Item[];
}

export const addItemsTest = pageObjectTest.extend<TestFixtures>({
    itemsDetails: [new Item()],
    item: async ({ items }, use) => {
        await use(items[0]);
    },
    items: async ({ page, inventoryPage, itemsDetails }, use) => {
        const expectedTitle = 'Products';
        await expect(inventoryPage.secondaryHeader.titleSpan).toHaveText(
            expectedTitle,
        );

        const names: Item[] = [];

        for (const itemDetail of itemsDetails) {
            const item = page
                .locator('.inventory_item')
                .filter({ hasText: `${itemDetail.name}` });

            const priceOfItem = item
                .locator('.inventory_item_price')
                .filter({ hasText: `$${itemDetail.price}` });

            const isItemVisible = await item.isVisible();
            const isPriceVisible = await priceOfItem.isVisible();

            if (isItemVisible && isPriceVisible) {
                const cartButton = item.getByRole('button');
                await expect(cartButton).toHaveText('Add to cart');

                await cartButton.click();
                await expect(cartButton).toHaveText('Remove');

                names.push(new Item(itemDetail.name, itemDetail.price));
            } else {
                throw new Error(
                    `Item "${itemDetail.name}" with price "$${itemDetail.price}" is incorrect or not visible!`,
                );
            }
        }

        await use(names);
    },
});
