/**
 * Class with item data, created for fixture purpose.
 *
 * The fields in this class define which item will be added to the cart.
 * There are default values for the class fields defined in the constructor.
 * When no values provided, the default fields are used.
 */
export class Item {
    name: string;
    price: number;

    /**
     * Adds item to the cart by setting the class fields with provided values.
     * @param name - The string value of the item name.
     * @param price - The numeric value of the item price.
     */
    constructor(name = 'Sauce Labs Backpack', price = 29.99) {
        this.name = name;
        this.price = price;
    }

    /**
     * Return adjusted price of item.
     * @returns The string value with dollar sign and fixed-point notation.
     */
    getDisplayFormat(): string {
        return `$${this.price.toFixed(2)}`;
    }
}
