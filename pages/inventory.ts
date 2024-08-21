import { expect, Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';
import { CheckoutStepTwo } from './checkoutStepTwo';

class SecondaryHeaderSection {
    readonly titleSpan: Locator;
    readonly filterActiveOption: Locator;
    readonly filterSelect: Locator;

    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
        this.filterActiveOption = root.locator('.active_option');
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
    ): Promise<{ names: string[]; quantity: number }> {
        const names: string[] = [];

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

                    names.push(itemName);
                } else if (action === 'remove') {
                    await expect(cartButton).toHaveText('Remove');

                    await cartButton.click();
                    await expect(cartButton).toHaveText('Add to cart');
                }
            } else {
                throw new Error(`Item "${itemName}" not found!`);
            }
        }
        return { names, quantity: itemNames.length };
    }

    async calculateTotalPriceWithoutTax(itemNames: string[]): Promise<number> {
        let totalPrice = 0;
        for (const itemName of itemNames) {
            const item = this.productList
                .locator('.inventory_item')
                .filter({ hasText: `${itemName}` });

            const isItemVisible = await item.isVisible();
            if (isItemVisible) {
                const buttonName = await item.getByRole('button').innerText();

                if (buttonName === 'Remove') {
                    const priceText = await item
                        .locator('.inventory_item_price')
                        .innerText();
                    const priceOfItem = parseFloat(priceText.replace('$', ''));
                    totalPrice += priceOfItem;
                } else {
                    throw new Error(
                        `Item "${itemName}" is not added to the cart!`,
                    );
                }
            } else {
                throw new Error(`Item "${itemName}" not found!`);
            }
        }
        return totalPrice;
    }

    async getProductOrder(orderBy: 'name' | 'price'): Promise<string[][]> {
        const products = await this.productList
            .locator(`.inventory_item_${orderBy}`)
            .all();
        return Promise.all(
            products.map((product) => product.allTextContents()),
        );
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

    async goToCheckoutStepTwo(): Promise<CheckoutStepTwo> {
        await this.page.goto('/checkout-step-two.html');
        return new CheckoutStepTwo(this.page);
    }
}
