import { Locator, Page } from '@playwright/test';
import { CommonHeaderSection } from './commonHeader';

/** Secondary header section. */
class SecondaryHeaderSection {
    readonly titleSpan: Locator;

    /**
     * Create the object.
     * @param root - The locator of top-level element of section.
     */
    constructor(root: Locator) {
        this.titleSpan = root.locator('.title');
    }
}

/** Checkout Step Two section. */
class CheckoutStepTwoSection {
    readonly itemTotal: Locator;

    /**
     * Create the object.
     * @param root - The locator of top-level element of section.
     */
    constructor(root: Locator) {
        this.itemTotal = root.locator('.summary_subtotal_label');
    }
}
/** Checkout Step Two view. */
export class CheckoutStepTwo {
    readonly page: Page;
    readonly primaryHeaderSection: CommonHeaderSection;
    readonly secondaryHeaderSection: SecondaryHeaderSection;
    readonly checkoutStepTwoSection: CheckoutStepTwoSection;

    /**
     * Create object.
     * @param page - The object representing a single tab in the browser.
     */
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

    /** Visit Checkout Step Two page (Overview). */
    async goto(): Promise<void> {
        await this.page.goto('/checkout-step-two.html');
    }
}
