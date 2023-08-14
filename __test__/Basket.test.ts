import Basket from '../Basket'

describe('test the Basket', () => {
    test('calculates total with single item', () => {
        const basket = new Basket(['Apple']);

        expect(basket.calculateTotal()).toBe(35);
    });

    test('calculates total with non-offer items', () => {
        const basket = new Basket(['Apple', 'Banana']);

        expect(basket.calculateTotal()).toBe(55);
    });

    test('calculates total with multiple non-offer items', () => {
        const basket = new Basket(['Apple', 'Apple', 'Banana']);

        expect(basket.calculateTotal()).toBe(90);
    });

    test('calculates total for one item with buyOneGetOneFreeOffer', () => {
        const basket = new Basket(['Melon']);

        expect(basket.calculateTotal()).toBe(50);
    });

    test('calculates total for two items with buyOneGetOneFreeOffer', () => {
        const basket = new Basket(['Melon', 'Melon']);

        expect(basket.calculateTotal()).toBe(50);
    });

    test('calculates total for one item should equal two items with buyOneGetOneFreeOffer', () => {
        const basket1 = new Basket(['Melon']);
        const basket2 = new Basket(['Melon', 'Melon']);

        expect(basket1.calculateTotal()).toEqual(basket2.calculateTotal());
    });

    test('calculates total for three items buyOneGetOneFreeOffer', () => {
        const basket = new Basket(['Melon', 'Melon', 'Melon']);

        expect(basket.calculateTotal()).toBe(100);
    });

    test('calculates total for one item with threeForTwoOffer', () => {
        const basket = new Basket(['Lime']);

        expect(basket.calculateTotal()).toBe(15);
    });

    test('calculates total for two items with threeForTwoOffer', () => {
        const basket = new Basket(['Lime', 'Lime']);

        expect(basket.calculateTotal()).toBe(30);
    });

    test('calculates total for three items with threeForTwoOffer', () => {
        const basket = new Basket(['Lime', 'Lime', 'Lime']);

        expect(basket.calculateTotal()).toBe(30);
    });

    test('calculates total for three items should equal two items with threeForTwoOffer', () => {
        const basket1 = new Basket(['Lime', 'Lime']);
        const basket2 = new Basket(['Lime', 'Lime', 'Lime']);

        expect(basket1.calculateTotal()).toEqual(basket2.calculateTotal());
    });

    test('calculates total with multiple offer items', () => {
        const basket = new Basket(['Banana', 'Melon', 'Banana', 'Melon']);

        expect(basket.calculateTotal()).toBe(90);
    });

    test('calculates total with multiple offer and non-offer items', () => {
        const basket = new Basket(['Apple', 'Apple', 'Lime', 'Banana', 'Melon', 'Melon', 'Lime']);

        expect(basket.calculateTotal()).toBe(170);
    });

    test('Doesn\'t throw error when item doesn\'t exist', () => {
        expect(() => new Basket(['Pear'])).not.toThrow('');
    });

});