import { InventoryItemsModel } from '@_src/models/inventory.model';

export const testItems: InventoryItemsModel = {
    backpack: 'Sauce Labs Backpack',
    jacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    bikeLight: 'Sauce Labs Bike Light',
    tShirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
};

export const itemPairs = {
    twoItems: [testItems.backpack, testItems.jacket],
    threeItems: [testItems.backpack, testItems.jacket, testItems.onesie],
};
