import { test } from '../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { Inventory } from '../pages/inventory';

test('Check addition and removal of items from the cart', async ({ page }) => {
    const inventory = new Inventory(page);
    const primaryHeaderSection = inventory.primaryHeaderSection;
    const inventorySection = inventory.inventorySection;

    const firstItem = 'Sauce Labs Backpack';
    const secondItem = 'Sauce Labs Fleece Jacket';

    await page.goto('/inventory.html');
    await expect(inventorySection.productList).toBeVisible();

    // Add items to the cart and check if they are there
    const numberOfAddedItems = await inventorySection.actionOnCart('add', [
        firstItem,
        secondItem,
    ]);
    await expect(primaryHeaderSection.cartBagde).toBeVisible();
    await expect(primaryHeaderSection.cartBagde).toHaveText(
        `${numberOfAddedItems}`,
    );

    const cartView = await primaryHeaderSection.clickCartIcon();
    expect(await cartView.cartListSection.getNamesofItems()).toEqual([
        firstItem,
        secondItem,
    ]);

    // Back to the `Inventory` view
    const inventoryView =
        await cartView.cartListSection.clickContinueShoppingButton();

    // Remove items from the cart and check if they are no longer there
    await inventoryView.inventorySection.actionOnCart('remove', [
        firstItem,
        secondItem,
    ]);
    await expect(primaryHeaderSection.cartBagde).toBeHidden();

    const cartViewAgain = await primaryHeaderSection.clickCartIcon();
    expect(await cartViewAgain.cartListSection.getNamesofItems()).toEqual([]);
});
