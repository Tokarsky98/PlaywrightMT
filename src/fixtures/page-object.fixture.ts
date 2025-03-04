import { Cart } from '../pages/cart.page';
import { CheckoutStepTwo } from '../pages/checkoutStepTwo.page';
import { Inventory } from '../pages/inventory.page';
import { Login } from '../pages/login.page';
import { test as baseTest } from '@playwright/test';

interface Pages {
    cartPage: Cart;
    checkoutStepTwoPage: CheckoutStepTwo;
    inventoryPage: Inventory;
    loginPage: Login;
}

export const pageObjectTest = baseTest.extend<Pages>({
    cartPage: async ({ page }, use) => {
        const cartPage = new Cart(page);
        await cartPage.goto();
        await use(cartPage);
    },
    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwo(page);
        await use(checkoutStepTwoPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new Inventory(page);
        await inventoryPage.goto();
        await use(inventoryPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new Login(page);
        await loginPage.goto();
        await use(loginPage);
    },
});
