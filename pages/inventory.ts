import { expect, Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';

class SecondaryHeaderSection {
    readonly titleSpan: Locator;
    readonly filterSelect: Locator;

    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
        this.filterSelect = root.locator('.product_sort_container');
    }
}

class InventorySection {
    readonly productList: Locator;

    constructor(root: Locator) {
        this.productList = root.locator('.inventory_list');
    }

    async actionOnCart(
        action: 'add' | 'remove',
        itemNames: string[],
    ): Promise<number> {
        for (const itemName of itemNames) {
            const item = this.productList
                .locator('.inventory_item')
                .filter({ hasText: `${itemName}` });

            const isItemVisible = await item.isVisible();
            const cartButton = item.getByRole('button');

            if (isItemVisible) {
                if (action === 'add') {
                    await expect(cartButton).toHaveText('Add to cart');

                    await cartButton.click();
                    await expect(cartButton).toHaveText('Remove');
                } else if (action === 'remove') {
                    await expect(cartButton).toHaveText('Remove');

                    await cartButton.click();
                    await expect(cartButton).toHaveText('Add to cart');
                }
            } else {
                throw new Error(`Item "${itemName}" not found!`);
            }
        }
        return itemNames.length;
    }
}

export class Inventory {
    readonly page: Page;
    readonly primaryHeaderSection: CommonHeaderSection;
    readonly secondaryHeaderSection: SecondaryHeaderSection;
    readonly inventorySection: InventorySection;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeaderSection = new CommonHeaderSection(page);
        this.secondaryHeaderSection = new SecondaryHeaderSection(
            page.locator('.header_secondary_container'),
        );
        this.inventorySection = new InventorySection(
            page.locator('#inventory_container'),
        );
    }

    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }
}
