import { Page } from 'playwright';
import { LoginPage } from '../pages/login';

export const automatedLogin = async (page: Page): Promise<void> => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.loginInput.fill(process.env.LOGIN!);
    await loginPage.passwordInput.fill(process.env.PASSWORD!);
    await loginPage.loginButton.click();
};
