import { expect, test } from '@_src/fixtures/merge.fixture';
import { LoginModel } from '@_src/models/login.model';
import { errorMessages } from '@_src/test-data/error-messages.data';
import { standardUser } from '@_src/test-data/login.data';

test.describe('Verify login', () => {
    test('login with correct credentials', async ({ loginPage }) => {
        const { header, loginSection } = loginPage;

        await expect(header.loginLogo).toBeVisible();

        const inventory = await loginSection.login(standardUser);
        await expect(inventory.inventorySection.productList).toBeVisible();
    });

    test('logout from the shop', async ({ loginPage }) => {
        const { header, loginSection } = loginPage;

        const inventory = await loginSection.login(standardUser);
        await inventory.header.logout();
        await expect(header.loginLogo).toBeVisible();
    });

    test('reject login with incorrect password', async ({ loginPage }) => {
        const loginSection = loginPage.loginSection;

        const incorrectUserData: LoginModel = {
            username: standardUser.username,
            password: 'wrongPassword',
        };

        await loginSection.login(incorrectUserData);
        await expect(loginSection.errorMessage).toContainText(
            errorMessages.invalidCredentials,
        );
    });
});
