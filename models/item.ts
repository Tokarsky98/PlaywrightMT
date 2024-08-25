export class Item {
    name: string;
    price: number;

    constructor(name = 'Sauce Labs Backpack', price = 29.99) {
        this.name = name;
        this.price = price;
    }

    getDisplayFormat(): string {
        return `$${this.price.toFixed(2)}`;
    }
}
