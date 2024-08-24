/* eslint-disable @typescript-eslint/no-unused-vars */
import { test } from '../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { Cart } from '../pages/cart';
import { Item } from '../models/item';

test('Check if item added by fixture appears in the cart', async ({
    page,
    item,
}) => {
    const cart = new Cart(page);
    const cartListSection = cart.cartListSection;

    await page.goto('/cart.html');
    expect(await cartListSection.getNamesofItems()).toEqual([item.name]);
});

test.describe('Test cart list with one item', () => {
    test.use({
        itemsDetails: [new Item('Sauce Labs Onesie', 7.99)],
    });

    test('Check if overwritten item added by fixture appears in the cart', async ({
        page,
        items,
    }) => {
        const cart = new Cart(page);
        const cartListSection = cart.cartListSection;
        const item = items[0];

        await page.goto('/cart.html');
        expect(await cartListSection.getNamesofItems()).toEqual([item.name]);
    });
});

test.describe('Test cart list with two items', () => {
    test.use({
        itemsDetails: [
            new Item('Sauce Labs Onesie', 7.99),
            new Item('Sauce Labs Fleece Jacket', 49.99),
        ],
    });

    test('Check if items added by fixture appear in the cart', async ({
        page,
        items,
    }) => {
        const cart = new Cart(page);
        const cartListSection = cart.cartListSection;

        await page.goto('/cart.html');
        expect(await cartListSection.getNamesofItems()).toEqual([
            items[0].name,
            items[1].name,
        ]);
    });
});
