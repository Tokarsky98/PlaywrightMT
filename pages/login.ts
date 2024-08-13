import { Locator, Page } from '@playwright/test';

class HeaderSection {
    readonly loginLogo: Locator;

    constructor(root: Locator) {
        this.loginLogo = root.filter({ hasText: 'Swag Labs' });
    }
}

class LoginSection {
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginLogo: Locator;
    readonly errorMessage: Locator;

    constructor(root: Locator) {
        this.loginInput = root.getByTestId('username');
        this.passwordInput = root.getByTestId('password');
        this.loginButton = root.getByTestId('login-button');
        this.loginLogo = root
            .locator('.login_logo')
            .filter({ hasText: 'Swag Labs' });
        this.errorMessage = root.getByTestId('error');
    }

    async login(login: string, password: string): Promise<void> {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

export class Login {
    readonly page: Page;
    readonly headerSection: HeaderSection;
    readonly loginSection: LoginSection;

    constructor(page: Page) {
        this.page = page;
        this.headerSection = new HeaderSection(page.locator('.login_logo'));
        this.loginSection = new LoginSection(
            page.locator('div[class="login_wrapper-inner"]'),
        );
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }
}
