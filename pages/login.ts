import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly productList: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button'); //Would be better: page.getByRole('button', { name: 'login-button' });
        this.productList = page.locator('.inventory_container');
        
    }

    async login(login: string, password: string) {
        await this.page.goto('/');
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}