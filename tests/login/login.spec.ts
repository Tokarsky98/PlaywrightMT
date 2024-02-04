import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { InventoryPage } from '../../pages/inventory';

test('Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);
    await expect(inventoryPage.productList).toBeVisible();
});

test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);
    await inventoryPage.logout();
    await expect(loginPage.loginLogo).toBeVisible();
});

test('Login fail', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.LOGIN!, 'wrongPassword');
    await expect(loginPage.errorMessage).toContainText(
        'Username and password do not match any user in this service',
    );
});
