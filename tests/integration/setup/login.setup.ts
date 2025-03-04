import { STORAGE_STATE } from '@_pw-config';
import { expect, test as setup } from '@_src/fixtures/merge.fixture';
import { standardUser } from '@_src/test-data/login.data';

setup('login and save session', async ({ page, loginPage }) => {
    const loginSection = loginPage.loginSection;

    const inventory = await loginSection.login(standardUser);
    await expect(inventory.inventorySection.productList).toBeVisible();

    await page.context().storageState({ path: STORAGE_STATE });
});
