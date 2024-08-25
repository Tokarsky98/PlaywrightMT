import { test as base } from '@playwright/test';
import { automatedLogin } from './automatedLogin';
import { Item } from '../models/item';
import { items } from './manageItems';

type TestFixtures = {
    itemsDetails: Item[];
    item: Item;
    items: Item[];
};

export const test = base.extend<TestFixtures>({
    page: async ({ page }, use) => {
        await automatedLogin(page);

        await use(page);
    },
    itemsDetails: [new Item()],
    item: async ({ items }, use) => {
        await use(items[0]);
    },
    items: async ({ page, itemsDetails }, use) => {
        await items(page, itemsDetails, use);
    },
});
