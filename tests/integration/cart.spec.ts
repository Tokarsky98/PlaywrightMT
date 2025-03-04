/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, test } from '../../fixtures/merge.fixture';
import { Cart } from '../../pages/cart.page';
import { Item } from '../../models/item.model';

test('check if item added by fixture appears in the cart', async ({
    page,
    automatedLogin,
    item,
    cartPage,
}) => {
    const expectedTitle = 'Your Cart';

    await expect(cartPage.secondaryHeader.titleSpan).toHaveText(expectedTitle);
    expect(await cartPage.cartListSection.getNamesOfItems()).toEqual([
        item.name,
    ]);
});

test.describe('Test cart list with one item', () => {
    test.use({
        itemsDetails: [new Item('Sauce Labs Onesie', 7.99)],
    });

    test('check if overwritten item added by fixture appears in the cart', async ({
        page,
        automatedLogin,
        items,
        cartPage,
    }) => {
        const item = items[0];

        expect(await cartPage.cartListSection.getNamesOfItems()).toEqual([
            item.name,
        ]);
    });
});

test.describe('Test cart list with two items', () => {
    test.use({
        itemsDetails: [
            new Item('Sauce Labs Onesie', 7.99),
            new Item('Sauce Labs Fleece Jacket', 49.99),
        ],
    });

    test('check if items added by fixture appear in the cart', async ({
        page,
        automatedLogin,
        items,
        cartPage,
    }) => {
        expect(await cartPage.cartListSection.getNamesOfItems()).toEqual([
            items[0].name,
            items[1].name,
        ]);
    });
});
