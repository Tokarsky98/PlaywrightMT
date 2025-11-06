import { expect, test } from '@_src/fixtures/merge.fixture';
import { Item } from '@_src/models/item.model';

test.describe('Cart Management', () => {
    test(
        'should display item added via fixture in cart',
        { tag: ['@logged'] },
        async ({ item, cartPage }) => {
            const expectedTitle = 'Your Cart';

            await expect(cartPage.secondaryHeader.titleSpan).toHaveText(
                expectedTitle,
            );

            const actualItems =
                await cartPage.cartListSection.getNamesOfItems();
            expect(actualItems, `Cart should contain "${item.name}"`).toEqual([
                item.name,
            ]);
        },
    );

    test.describe('Single item in cart', () => {
        test.use({
            itemsDetails: [[new Item('Sauce Labs Onesie', 7.99)]],
        });

        test(
            'should display overridden fixture item in cart',
            { tag: ['@logged'] },
            async ({ items, cartPage }) => {
                const actualItems =
                    await cartPage.cartListSection.getNamesOfItems();
                expect(
                    actualItems,
                    'Cart should contain overridden item',
                ).toEqual([items[0].name]);
            },
        );
    });

    test.describe('Multiple items in cart', () => {
        test.use({
            itemsDetails: [
                [
                    new Item('Sauce Labs Onesie', 7.99),
                    new Item('Sauce Labs Fleece Jacket', 49.99),
                ],
            ],
        });

        test(
            'should display all items added via fixture',
            { tag: ['@logged'] },
            async ({ items, cartPage }) => {
                const actualItems =
                    await cartPage.cartListSection.getNamesOfItems();
                const expectedNames = items.map((item) => item.name);

                expect(
                    actualItems,
                    'Cart should contain all fixture items',
                ).toEqual(expectedNames);
            },
        );
    });
});
