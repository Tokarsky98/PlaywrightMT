import { expect, test } from '@_src/fixtures/merge.fixture';
import { errorMessages } from '@_src/test-data/error-messages.data';
import {
    invalidUsers,
    lockedUser,
    standardUser,
} from '@_src/test-data/login.data';

test.describe('Login functionality', () => {
    test.describe('Successful login scenarios', () => {
        test('should successfully login with valid credentials and display inventory', async ({
            loginPage,
        }) => {
            const { header, loginSection } = loginPage;

            await expect(header.loginLogo).toBeVisible();

            const inventory = await loginSection.login(standardUser);
            await expect(inventory.inventorySection.productList).toBeVisible();
        });

        test('should successfully logout and return to login page', async ({
            loginPage,
        }) => {
            const { header, loginSection } = loginPage;

            const inventory = await loginSection.login(standardUser);
            await inventory.header.logout();
            await expect(header.loginLogo).toBeVisible();
        });
    });

    test.describe('Failed login scenarios', () => {
        test('should reject login with incorrect password and show error message', async ({
            loginPage,
        }) => {
            const loginSection = loginPage.loginSection;

            await loginSection.login(invalidUsers.wrongPassword);
            await expect(loginSection.errorMessage).toHaveText(
                errorMessages.invalidCredentials,
            );
        });

        test('should reject login with empty username', async ({
            loginPage,
        }) => {
            const loginSection = loginPage.loginSection;

            await loginSection.login(invalidUsers.emptyUsername);
            await expect(loginSection.errorMessage).toHaveText(
                errorMessages.emptyUsername,
            );
        });

        test('should reject login with empty password', async ({
            loginPage,
        }) => {
            const loginSection = loginPage.loginSection;

            await loginSection.login(invalidUsers.emptyPassword);
            await expect(loginSection.errorMessage).toHaveText(
                errorMessages.emptyPassword,
            );
        });

        test('should reject login with locked user account', async ({
            loginPage,
        }) => {
            const loginSection = loginPage.loginSection;

            await loginSection.login(lockedUser);

            await expect(loginSection.errorMessage).toHaveText(
                errorMessages.lockedUser,
            );
        });
    });
});
