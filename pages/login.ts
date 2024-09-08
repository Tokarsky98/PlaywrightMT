import { Locator, Page } from '@playwright/test';

/** Header section of login page. */
class Header {
    readonly loginLogo: Locator;

    /**
     * Create the object.
     * @param root - The locator of top-level element of section.
     */
    constructor(root: Locator) {
        this.loginLogo = root.filter({ hasText: 'Swag Labs' });
    }
}

/** Login section. */
class LoginSection {
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginLogo: Locator;
    readonly errorMessage: Locator;

    /**
     * Create the object.
     * @param root - The locator of top-level element of section.
     */
    constructor(root: Locator) {
        this.loginInput = root.getByTestId('username');
        this.passwordInput = root.getByTestId('password');
        this.loginButton = root.getByTestId('login-button');
        this.loginLogo = root
            .locator('.login_logo')
            .filter({ hasText: 'Swag Labs' });
        this.errorMessage = root.getByTestId('error');
    }

    /**
     * Log in to Swag Labs with certain credentials.
     * @param login - String value of the login.
     * @param password - String value of the password.
     */
    async login(login: string, password: string): Promise<void> {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

/** Login view. */
export class Login {
    readonly page: Page;
    readonly header: Header;
    readonly loginSection: LoginSection;

    /**
     * Create object.
     * @param page - The object representing a single tab in the browser.
     */
    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page.locator('.login_logo'));
        this.loginSection = new LoginSection(
            page.locator('div[class="login_wrapper-inner"]'),
        );
    }

    /** Visit Cart page. */
    async goto(): Promise<void> {
        await this.page.goto('/');
    }
}
