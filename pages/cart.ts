import { Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';
import { Inventory } from './inventory';

/** Secondary header section. */
class SecondaryHeaderSection {
    readonly titleSpan: Locator;

    /**
     * Create the object.
     * @param root - The locator of top-level element of section.
     */
    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
    }
}

/** Cart list section. */
class CartListSection {
    readonly page: Page;
    readonly cartList: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    /**
     * Create the object.
     * @param page - The object representing a single tab in the browser.
     * @param root - The locator of top-level element of section.
     */
    constructor(page: Page, root: Locator) {
        this.page = page;
        this.cartList = root.locator('.cart_list');
        this.continueShoppingButton = root.getByRole('button', {
            name: 'Continue Shopping',
        });
        this.checkoutButton = root.getByRole('button', { name: 'Checkout' });
    }

    /**
     * Open Inventory view after clicking on the `Continue Shopping` button.
     * @returns Inventory object representing the opened inventory page.
     */
    async clickContinueShoppingButton(): Promise<Inventory> {
        await this.continueShoppingButton.click();
        return new Inventory(this.page);
    }

    /**
     * Get the names of all listed items in the cart.
     * @returns Array of string values representing the names of items in the cart.
     */
    async getNamesofItems(): Promise<string[]> {
        const names = await this.cartList.locator('.cart_item').all();
        const cartItemNames = await Promise.all(
            names.map(async (name) => {
                return await name.locator('.inventory_item_name').textContent();
            }),
        );
        return cartItemNames.filter((name) => name !== null) as string[];
    }
}

/** Cart view. */
export class Cart {
    readonly page: Page;
    readonly primaryHeaderSection: CommonHeaderSection;
    readonly secondaryHeaderSection: SecondaryHeaderSection;
    readonly cartListSection: CartListSection;

    /**
     * Create object.
     * @param page - The object representing a single tab in the browser.
     */
    constructor(page: Page) {
        this.page = page;
        this.primaryHeaderSection = new CommonHeaderSection(page);
        this.secondaryHeaderSection = new SecondaryHeaderSection(
            page.locator('.header_secondary_container'),
        );
        this.cartListSection = new CartListSection(
            page,
            page.locator('#cart_contents_container'),
        );
    }

    /** Visit Cart page. */
    async goto(): Promise<void> {
        await this.page.goto('/cart.html');
    }
}
