import { Login } from '../pages/login.page';
import { standardUser } from '../test-data/login.data';
import { pageObjectTest } from './page-object.fixture';

interface TestFixtures {
    automatedLogin: Login;
}

export const automatedLoginTest = pageObjectTest.extend<TestFixtures>({
    automatedLogin: async ({ page }, use) => {
        const login = new Login(page);
        const loginSection = login.loginSection;

        await page.goto('/');
        await loginSection.login(standardUser);
        await use(login);
    },
});
