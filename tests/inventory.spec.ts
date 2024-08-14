import { test } from '../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { Inventory } from '../pages/inventory';

test('abcd', async ({ page }) => {
    const inventory = new Inventory(page);
    const inventorySection = inventory.inventorySection;

    await page.goto('/inventory.html');
    await expect(inventorySection.productList).toBeVisible();
});
