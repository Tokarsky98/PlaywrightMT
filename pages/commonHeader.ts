import { Locator, Page } from '@playwright/test';

export class CommonHeaderSection {
    readonly burgerMenu: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        const header = page.getByTestId('primary-header');
        this.burgerMenu = header.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = header.locator('#logout_sidebar_link');
    }

    async logout(): Promise<void> {
        await this.burgerMenu.click();
        await this.logoutLink.click();
    }
}
