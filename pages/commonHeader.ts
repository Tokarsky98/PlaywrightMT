import { Locator, Page } from '@playwright/test';
import { Cart } from './cart';

export class CommonHeaderSection {
    readonly page: Page;
    readonly burgerMenu: Locator;
    readonly logoutLink: Locator;
    readonly cartIcon: Locator;
    readonly cartBagde: Locator;

    constructor(page: Page) {
        const header = page.getByTestId('primary-header');
        this.page = page;
        this.burgerMenu = header.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = header.locator('#logout_sidebar_link');
        this.cartIcon = header.locator('.shopping_cart_link');
        this.cartBagde = header.locator('.shopping_cart_badge');
    }

    async logout(): Promise<void> {
        await this.burgerMenu.click();
        await this.logoutLink.click();
    }

    async clickCartIcon(): Promise<Cart> {
        await this.cartIcon.click();
        return new Cart(this.page);
    }
}
