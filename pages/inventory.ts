import { expect, Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';
import { CheckoutStepTwo } from './checkoutStepTwo';

/** Secondary header section. */
class SecondaryHeaderSection {
    readonly titleSpan: Locator;
    readonly filterActiveOption: Locator;
    readonly filterSelect: Locator;

    /**
     * Create the object.
     * @param root - The locator of top-level element of section.
     */
    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
        this.filterActiveOption = root.locator('.active_option');
        this.filterSelect = root.locator('.product_sort_container');
    }
}

/** Inventory section. */
class InventorySection {
    readonly productList: Locator;

    /**
     * Create the object.
     * @param root - The locator of top-level element of section.
     */
    constructor(root: Locator) {
        this.productList = root.locator('.inventory_list');
    }

    /**
     * Perform selected action on listed items based on provided item names.
     *
     * This method iterates over list of item names, finds items on the product
     * list and adds or removes them from the cart (based on the action).
     *
     * If item is not visible or button name is not valid, the error occurs.
     * @param action - String value of performed action.
     * @param itemNames - Array of strings representing the names of items on which the action will be performed.
     * @returns Object containing an array of strings with names of items on which action has been performed
     * and the number of the actioned items.
     */
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

    /**
     * Calculate the total price of added items in the cart without tax.
     *
     * This method iterates over list of item names finds items on the product
     * list and calculates their prices based on apperence in the cart.
     *
     * If item is not visible or its not in the cart (based on `Remove` button), the error occurs.
     * @param itemNames - Array of strings representing the names of items.
     * @returns The total price of items which have been added to the cart.
     */
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

    /**
     * Get current order of items from the product list based on provided criteria.
     *
     * This method finds all items on the product list and returns their data (names or prices) as an array of arrays.
     *
     * It is useful in terms of comparing the order of items before and after the certain change.
     * @param orderBy - String value representing the order criterion.
     * @returns The array of string arrays containing selected data.
     */
    async getItemsOrder(orderBy: 'name' | 'price'): Promise<string[][]> {
        const items = await this.productList
            .locator(`.inventory_item_${orderBy}`)
            .all();
        return Promise.all(items.map((item) => item.allTextContents()));
    }
}

/** Inventory view. */
export class Inventory {
    readonly page: Page;
    readonly primaryHeaderSection: CommonHeaderSection;
    readonly secondaryHeaderSection: SecondaryHeaderSection;
    readonly inventorySection: InventorySection;

    /**
     * Create the object.
     * @param page - The object representing a single tab in the browser.
     */
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

    /** Visit Inventory page. */
    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    /**
     * Visit Checkout Step Two page (Overview).
     * @returns Checkout Step Two object representing the opened Chekcout Step Two page.
     */
    async goToCheckoutStepTwo(): Promise<CheckoutStepTwo> {
        await this.page.goto('/checkout-step-two.html');
        return new CheckoutStepTwo(this.page);
    }
}
