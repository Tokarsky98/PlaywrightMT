import { Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';

class SecondaryHeaderSection {
    readonly titleSpan: Locator;
    readonly filterSelect: Locator;

    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
        this.filterSelect = root.locator('.product_sort_container');
    }
}
class InventorySection {
    readonly productList: Locator;

    constructor(root: Locator) {
        this.productList = root.locator('.inventory_list');
    }
}

export class Inventory {
    readonly page: Page;
    readonly primaryHeaderSection: CommonHeaderSection;
    readonly secondaryHeaderSection: SecondaryHeaderSection;
    readonly inventorySection: InventorySection;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeaderSection = new CommonHeaderSection(page);
        this.secondaryHeaderSection = new SecondaryHeaderSection(
            page.locator('.header_secondary_container'),
        );
        this.inventorySection = new InventorySection(
            page.locator('#inventory_container'),
        );
    }

    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }
}
