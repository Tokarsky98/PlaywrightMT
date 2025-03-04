import { mergeTests } from 'playwright/test';
import { pageObjectTest } from './page-object.fixture';
import { automatedLoginTest } from './automated-login.fixture';
import { addItemsTest } from './add-items.fixture';

export const test = mergeTests(
    pageObjectTest,
    addItemsTest,
    automatedLoginTest,
);

export { expect } from 'playwright/test';
