import { Page, expect } from '@playwright/test';
import { Item } from '../models/item';

export const items = async (
    page: Page,
    itemDetails: Item[],
    use: (r: Item[]) => Promise<void>,
): Promise<void> => {
    const names: Item[] = [];

    for (const itemDetail of itemDetails) {
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
            throw new Error('Item details are incorrect!');
        }
    }

    await use(names);
};
