import { test as base } from '@playwright/test';
import { automatedLogin } from './automatedLogin';

export const test = base.extend({
    page: async ({ page }, use) => {
        await automatedLogin(page);

        await use(page);
    },
});
