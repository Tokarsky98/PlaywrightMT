import { expect, test } from '@_src/fixtures/merge.fixture';
import { Item } from '@_src/models/item.model';

test('check if item added by fixture appears in the cart @logged', async ({
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

    test('check if overwritten item added by fixture appears in the cart @logged', async ({
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

    test('check if items added by fixture appear in the cart @logged', async ({
        items,
        cartPage,
    }) => {
        expect(await cartPage.cartListSection.getNamesOfItems()).toEqual([
            items[0].name,
            items[1].name,
        ]);
    });
});
