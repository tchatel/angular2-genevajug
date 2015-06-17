import {
    bootstrap,
    Component,
    View,
    NgFor
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
    selector: 'cart-row',
    properties: ['model']
})
@View({
    template: `
        <div class="cart-col">{{model.product.reference}}</div>
        <div class="cart-col">{{model.product.label}}</div>
        <div class="cart-col">{{model.product.getPrice()}}</div>
        <div class="cart-col">{{model.quantity}}</div>
        <div class="cart-col">{{model.getAmount()}}</div>
        <div class="cart-col"></div>
    `,
    directives: []
})
class CartRowComponent {
    model: CartRow;
    constructor() {
    }
}

@Component({
    selector: 'cart',
    properties: ['model']
})
@View({
    template: `
        <div class="rows">
            <div class="cart-header">
                <div class="cart-col">Reference</div>
                <div class="cart-col">Label</div>
                <div class="cart-col">Price</div>
                <div class="cart-col">Quantity</div>
                <div class="cart-col">Amount</div>
                <div class="cart-col"></div>
            </div>
            <cart-row *ng-for="#row of model.rows" [model]="row"></cart-row>
        </div>
        <p>Model:{{model | json}}</p>
    `,
    directives: [NgFor, CartRowComponent]
})
class CartComponent {
    model: Cart;
    constructor() {
    }
}

@Component({
    selector: 'cart-example'
})
@View({
    template: `
        <cart [model]="cart"></cart>
    `,
    directives: [CartComponent]
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

