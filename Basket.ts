// using OOP, mapping list to Products/Offers for total

// offer objects
abstract class Offer {
    abstract calculateTotal(quantity: number, price: number): number;
}

class BuyOneGetOneFreeOffer implements Offer {
    calculateTotal(quantity: number, price: number): number {
        const offset = quantity % 2 === 0 ? 0 : 1;

        return (((quantity - offset) / 2) + offset) * price;
    }
}

class ThreeForTwoOffer implements Offer {
    calculateTotal(quantity: number, price: number): number {
        const remainder = quantity % 3;
        const offset = remainder === 0 ? 0 : remainder;

        return (((quantity - offset) * (2/3)) + offset) * price;
    }
}

// product object
class Product {
    private readonly name: string;
    private readonly price: number;
    private readonly offer?: Offer;

    constructor(name: string, price: number, offer?: Offer) {
        this.name = name;
        this.price = price;
        this.offer = offer;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getOffer(): Offer {
        return this.offer;
    }
}

// offers
const buyOneGetOneFreeOffer = new BuyOneGetOneFreeOffer();
const threeForTwoOffer = new ThreeForTwoOffer();

// products
const apple = new Product('Apple', 35);
const banana = new Product('Banana', 20);
const melon = new Product('Melon', 50, buyOneGetOneFreeOffer);
const lime = new Product('Lime', 15, threeForTwoOffer);

// basket
class Basket {
    private readonly items: Map<Product, number> = new Map();
    private readonly listProductMap: Map<string, Product> = new Map(Object.entries({
        Apple: apple,
        Banana: banana,
        Melon: melon,
        Lime: lime
    }));

    constructor(list: Array<string>) {
        for (const text of list) {
            if (this.listProductMap.has(text)) {
                const product = this.listProductMap.get(text);
                const quantity = this.items.get(product);
                this.items.set(product, quantity ? quantity + 1 : 1);
            }
        }
    }

    calculateTotal(): number {
        let total = 0;

        for (const [product, quantity] of this.items) {
            const offer = product.getOffer();
            total += offer ? offer.calculateTotal(quantity, product.getPrice()) : product.getPrice() * quantity;
        }

        return total;
    }
}

export default Basket;
