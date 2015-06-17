import {
    bootstrap,
    Component,
    View
} from 'angular2/angular2';

//import {
//    bootstrap,
//    NgFor,
//    Component,
//    View,
//    formDirectives,
//    FormBuilder, ControlGroup,
//    Control,
//    Validators,
//    ON_PUSH
//    } from 'angular2/angular2';


@Component({
    selector: 'cart-example'
})
@View({
    template: `
        {{cart |json}}
    `,
    directives: []
})
class CartExample {
    cart: Cart;
    constructor() {
        this.cart = cartBuilder.getSmall();
    }
}


class Cart {
    constructor (public rows: CartRow[] = []) {
    }
    remove(row: CartRow): void  {
        var index = this.rows.indexOf(row);
        this.rows.splice(index, 1);
    }
}
class CartRow {
    constructor (public product: Product,
                 public quantity: number) {
    }
    getAmount() {
        return this.product.price * this.quantity;
    }
}
class Product {
    constructor (public reference: string,
                 public label: string,
                 public price: number) {
    }
    getPrice() {
        //console.log("getPrice()");
        return this.price;
    }
}

var cartBuilder = {
    getSmall: function () {
        return new Cart([
            new CartRow(new Product("REF01", "Product 01", 11), 3),
            new CartRow(new Product("REF02", "Product 02", 22), 1),
            new CartRow(new Product("REF03", "Product 03", 33), 4)
        ]);
    },
    getBig: function () {
        var cart = new Cart();
        for (var i = 0 ; i < 2000 ; i++) {
            cart.rows.push(new CartRow(new Product("REF"+i, "Product "+i, 10+i), 1));
        }
        return cart;
    }
};


bootstrap(CartExample);

