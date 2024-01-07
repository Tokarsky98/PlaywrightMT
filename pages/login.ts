import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginLogo: Locator;
    readonly errorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button'); // Would be better: page.getByRole('button', { name: 'login-button' });
        this.loginLogo = page.locator('.login_logo').filter({ hasText: 'Swag Labs' });
        this.errorMessage = page.getByTestId('error');
    }   

    async login(login: string, password: string) {
        await this.page.goto('/');
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}