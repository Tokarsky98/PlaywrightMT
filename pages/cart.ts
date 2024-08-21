import { Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';
import { Inventory } from './inventory';

class SecondaryHeaderSection {
    readonly titleSpan: Locator;

    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
    }
}

class CartListSection {
    readonly page: Page;
    readonly cartList: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page, root: Locator) {
        this.page = page;
        this.cartList = root.locator('.cart_list');
        this.continueShoppingButton = root.getByRole('button', {
            name: 'Continue Shopping',
        });
        this.checkoutButton = root.getByRole('button', { name: 'Checkout' });
    }

    async clickContinueShoppingButton(): Promise<Inventory> {
        await this.continueShoppingButton.click();
        return new Inventory(this.page);
    }

    async getNamesofItems(): Promise<string[]> {
        const names = await this.cartList.locator('.cart_item').all();
        const cartItemNames = await Promise.all(
            names.map(async (name) => {
                return name.locator('.inventory_item_name').textContent();
            }),
        );
        return cartItemNames.filter((name) => name !== null) as string[];
    }
}

export class Cart {
    readonly page: Page;
    readonly primaryHeaderSection: CommonHeaderSection;
    readonly secondaryHeaderSection: SecondaryHeaderSection;
    readonly cartListSection: CartListSection;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeaderSection = new CommonHeaderSection(page);
        this.secondaryHeaderSection = new SecondaryHeaderSection(
            page.locator('.header_secondary_container'),
        );
        this.cartListSection = new CartListSection(
            page,
            page.locator('#cart_contents_container'),
        );
    }

    async goto(): Promise<void> {
        await this.page.goto('/cart.html');
    }
}
