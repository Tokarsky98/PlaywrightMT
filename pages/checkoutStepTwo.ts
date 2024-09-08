import { Locator, Page } from '@playwright/test';
import { Header, SecondaryHeader } from './headers';

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
    readonly header: Header;
    readonly secondaryHeader: SecondaryHeader;
    readonly checkoutStepTwoSection: CheckoutStepTwoSection;

    /**
     * Create object.
     * @param page - The object representing a single tab in the browser.
     */
    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.secondaryHeader = new SecondaryHeader(
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
