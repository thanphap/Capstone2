function Cart(id, img, name, amount, price) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.amount = amount;
    this.price = price;
    this.tottalPrice = 0;
    this.calTottalPrice = function() {
        this.tottalPrice = this.price * this.amount;
    }
}