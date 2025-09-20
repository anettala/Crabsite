export default class Crab {
    constructor(amount, price, currently) {
        this.amount = amount;
        this.price = price;
        this.currently = currently;
    }

    addCrab() {
        this.currently++;
    }

    getCurrently() {
        return this.currently;
    }

    getAmount() {
        return this.amount;
    }

    getPrice() {
        return Math.floor(this.price * Math.pow(1.15, this.currently));
    }
}