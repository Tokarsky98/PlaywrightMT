import { test, expect } from '@playwright/test';
import { LoginPage } from "../../pages/login";

test('Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);
    await expect(loginPage.productList).toBeVisible();
  });