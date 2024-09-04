import { Locator, Page } from '@playwright/test';
import { Cart } from './cart';

/**
 * Header on the top of each page.
 * This class has several properties for managing view headers.
 */
export class CommonHeaderSection {
    readonly page: Page;
    readonly burgerMenu: Locator;
    readonly logoutLink: Locator;
    readonly cartIcon: Locator;
    readonly cartBagde: Locator;

    /**
     * Initializes the header of the given browser tab.
     * @param page - The object representing a single tab in the browser.
     */
    constructor(page: Page) {
        const header = page.getByTestId('primary-header');
        this.page = page;
        this.burgerMenu = header.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = header.locator('#logout_sidebar_link');
        this.cartIcon = header.locator('.shopping_cart_link');
        this.cartBagde = header.locator('.shopping_cart_badge');
    }

    /** Log out of the Swag Labs shop. */
    async logout(): Promise<void> {
        await this.burgerMenu.click();
        await this.logoutLink.click();
    }

    /**
     * Open Cart view after clicking on the `Cart` icon.
     * @returns Cart object representing the opened cart page.
     */
    async clickCartIcon(): Promise<Cart> {
        await this.cartIcon.click();
        return new Cart(this.page);
    }
}
