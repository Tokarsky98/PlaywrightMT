import { test } from '@playwright/test';
import { expect } from '@playwright/test';
import { Login } from '../../pages/login';
import { standardUser } from '../../test-data/login.data';
import { LoginModel } from '../../models/login.model';

test.describe('Verify login', () => {
    test('login with correct credentials', async ({ page }) => {
        const login = new Login(page);

        const header = login.header;
        const loginSection = login.loginSection;

        await login.goto();
        await expect(header.loginLogo).toBeVisible();

        const inventory = await loginSection.login(standardUser);
        await expect(inventory.inventorySection.productList).toBeVisible();
    });

    test('logout from the shop', async ({ page }) => {
        const login = new Login(page);

        const loginHeader = login.header;
        const loginSection = login.loginSection;

        await login.goto();
        const inventory = await loginSection.login(standardUser);
        await inventory.header.logout();
        await expect(loginHeader.loginLogo).toBeVisible();
    });

    test('reject login with incorrect password fail', async ({ page }) => {
        const login = new Login(page);
        const loginSection = login.loginSection;
        const expectedMessage =
            'Username and password do not match any user in this service';

        const incorrectUserData: LoginModel = {
            username: standardUser.username,
            password: 'wrongPassword',
        };

        await login.goto();
        await loginSection.login(incorrectUserData);
        await expect(loginSection.errorMessage).toContainText(expectedMessage);
    });
});
