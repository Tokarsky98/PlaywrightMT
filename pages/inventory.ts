import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productList: Locator;
    readonly burgerMenu: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator('.inventory_container');
        this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async logout() {
        await this.burgerMenu.click();
        await this.logoutLink.click();
    }
}
