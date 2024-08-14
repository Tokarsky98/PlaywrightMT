import { test } from '../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory';

test('abcd', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await page.goto('/inventory.html');
    await expect(inventoryPage.productList).toBeVisible();
});
