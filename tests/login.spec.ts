import { test } from '@playwright/test';
import { expect } from '@playwright/test';
import { Login } from '../pages/login';
import { Inventory } from '../pages/inventory';

test('Login to the shop', async ({ page }) => {
    const login = new Login(page);
    const inventory = new Inventory(page);

    const headerSection = login.headerSection;
    const loginSection = login.loginSection;
    const inventorySection = inventory.inventorySection;

    await login.goto();
    await expect(headerSection.loginLogo).toBeVisible();

    await loginSection.login(process.env.LOGIN!, process.env.PASSWORD!);
    await expect(inventorySection.productList).toBeVisible();
});

test('Logout from the shop', async ({ page }) => {
    const login = new Login(page);
    const inventory = new Inventory(page);

    const headerSection = login.headerSection;
    const loginSection = login.loginSection;
    const primaryHeaderSection = inventory.primaryHeaderSection;

    await login.goto();
    await loginSection.login(process.env.LOGIN!, process.env.PASSWORD!);
    await primaryHeaderSection.logout();
    await expect(headerSection.loginLogo).toBeVisible();
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
