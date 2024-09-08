import { test } from '@playwright/test';
import { expect } from '@playwright/test';
import { Login } from '../pages/login';
import { Inventory } from '../pages/inventory';

test('Login to the shop', async ({ page }) => {
    const login = new Login(page);
    const inventory = new Inventory(page);

    const header = login.header;
    const loginSection = login.loginSection;
    const inventorySection = inventory.inventorySection;

    await login.goto();
    await expect(header.loginLogo).toBeVisible();

    await loginSection.login(process.env.LOGIN!, process.env.PASSWORD!);
    await expect(inventorySection.productList).toBeVisible();
});

test('Logout from the shop', async ({ page }) => {
    const login = new Login(page);
    const inventory = new Inventory(page);

    const loginHeader = login.header;
    const loginSection = login.loginSection;
    const header = inventory.header;

    await login.goto();
    await loginSection.login(process.env.LOGIN!, process.env.PASSWORD!);
    await header.logout();
    await expect(loginHeader.loginLogo).toBeVisible();
});

test('Login fail', async ({ page }) => {
    const login = new Login(page);
    const loginSection = login.loginSection;
    const message =
        'Username and password do not match any user in this service';

    await login.goto();
    await loginSection.login(process.env.LOGIN!, 'wrongPassword');
    await expect(loginSection.errorMessage).toContainText(message);
});
