import { expect, test } from '../../fixtures/merge.fixture';
import { LoginModel } from '../../src/models/login.model';
import { standardUser } from '../../test-data/login.data';

test.describe('Verify login', () => {
    test('login with correct credentials', async ({ loginPage }) => {
        const header = loginPage.header;
        const loginSection = loginPage.loginSection;

        await expect(header.loginLogo).toBeVisible();

        const inventory = await loginSection.login(standardUser);
        await expect(inventory.inventorySection.productList).toBeVisible();
    });

    test('logout from the shop', async ({ loginPage }) => {
        const loginHeader = loginPage.header;
        const loginSection = loginPage.loginSection;

        const inventory = await loginSection.login(standardUser);
        await inventory.header.logout();
        await expect(loginHeader.loginLogo).toBeVisible();
    });

    test('reject login with incorrect password fail', async ({ loginPage }) => {
        const loginSection = loginPage.loginSection;
        const expectedMessage =
            'Username and password do not match any user in this service';

        const incorrectUserData: LoginModel = {
            username: standardUser.username,
            password: 'wrongPassword',
        };

        await loginSection.login(incorrectUserData);
        await expect(loginSection.errorMessage).toContainText(expectedMessage);
    });
});
