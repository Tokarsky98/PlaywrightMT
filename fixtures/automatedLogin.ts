import { Page } from 'playwright';
import { Login } from '../pages/login';

export const automatedLogin = async (page: Page): Promise<void> => {
    const login = new Login(page);
    const loginSection = login.loginSection;

    await page.goto('/');
    await loginSection.loginInput.fill(process.env.LOGIN!);
    await loginSection.passwordInput.fill(process.env.PASSWORD!);
    await loginSection.loginButton.click();
};
