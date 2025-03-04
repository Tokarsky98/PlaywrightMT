import { Page } from 'playwright';
import { Login } from '../pages/login.page';
import { standardUser } from '../test-data/login.data';

export const automatedLogin = async (page: Page): Promise<void> => {
    const login = new Login(page);
    const loginSection = login.loginSection;

    await page.goto('/');
    await loginSection.login(standardUser);
};
