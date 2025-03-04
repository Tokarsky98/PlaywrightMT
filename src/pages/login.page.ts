import { LoginModel } from '../models/login.model';
import { Inventory } from './inventory.page';
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
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginLogo: Locator;
    readonly errorMessage: Locator;

    /**
     * Create the object.
     * @param page - The object representing a single tab in the browser.
     * @param root - The locator of top-level element of section.
     */
    constructor(page: Page, root: Locator) {
        this.page = page;
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
     * @param loginData - String values of username and password.
     * @returns Page object for the inventory page.
     */
    async login(loginData: LoginModel): Promise<Inventory> {
        await this.loginInput.fill(loginData.username);
        await this.passwordInput.fill(loginData.password);
        await this.loginButton.click();
        return new Inventory(this.page);
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
            page,
            page.locator('div[class="login_wrapper-inner"]'),
        );
    }

    /** Visit Login page. */
    async goto(): Promise<void> {
        await this.page.goto('/');
    }
}
