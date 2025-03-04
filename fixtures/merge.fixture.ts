import { mergeTests } from 'playwright/test';
import { pageObjectTest } from './page-object.fixture';
import { addItemsTest } from './add-items.fixture';

export const test = mergeTests(pageObjectTest, addItemsTest);

export { expect } from 'playwright/test';
