import { Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';

class SecondaryHeaderSection {
    readonly titleSpan: Locator;

    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
    }
}

class CheckoutStepTwoSection {
    readonly itemTotal: Locator;

    constructor(root: Locator) {
        this.itemTotal = root.locator('.summary_subtotal_label');
    }
}

export class CheckoutStepTwo {
    readonly page: Page;
    readonly primaryHeaderSection: CommonHeaderSection;
    readonly secondaryHeaderSection: SecondaryHeaderSection;
    readonly checkoutStepTwoSection: CheckoutStepTwoSection;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeaderSection = new CommonHeaderSection(page);
        this.secondaryHeaderSection = new SecondaryHeaderSection(
            page.locator('.header_secondary_container'),
        );
        this.checkoutStepTwoSection = new CheckoutStepTwoSection(
            page.locator('div[id="checkout_summary_container"]'),
        );
    }

    async goto(): Promise<void> {
        await this.page.goto('/checkout-step-two.html');
    }
}
