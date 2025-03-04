import { addItemsTest } from './add-items.fixture';
import { pageObjectTest } from './page-object.fixture';
import { mergeTests } from 'playwright/test';

export const test = mergeTests(pageObjectTest, addItemsTest);

export { expect } from 'playwright/test';
