import {
    bootstrap,
    Component,
    View,
    NgFor,
    FormBuilder,
    ControlGroup,
    Validators,
    formDirectives,
    ON_PUSH
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
    selector: 'cart-form',
    properties: ['model'],
    appInjector: [FormBuilder]
})
@View({
    template: `
        <form [ng-form-model]="form">
          <span ng-control-group="product">
            <label>Reference: <input type="text" ng-control="reference"/></label>
            <label>Label: <input type="text" ng-control="label"/></label>
            <label>Price: <input type="number" ng-control="price"/></label>
          </span>
            <label>Quantity: <input type="number" ng-control="quantity"/></label>
            <input type="button" (click)="add()" value="Add" [disabled]="!form.valid"/>
        </form>
    `,
    directives: [formDirectives]
})
class CartFormComponent {
    model: Cart;
    form: ControlGroup;
    constructor(fb: FormBuilder) {
        this.form = fb.group({
            product: fb.group({
                reference: ["", Validators.required],
                label: ["", Validators.required],
                price: ["", Validators.required]
            }),
            quantity: ["", Validators.required],
        });
    }
    add() {
        var value = this.form.value,
            quantity = value.quantity,
            product = value.product;
        this.model.rows.push(
            new CartRow(
                new Product(
                    product.reference,
                    product.label,
                    product.price
                ),
                quantity
            )
        );
    }
}


@Component({
    selector: 'cart-row',
    properties: ['model', 'parentModel'],
    changeDetection: ON_PUSH
})
@View({
    template: `
        <div class="cart-col">{{model.product.reference}}</div>
        <div class="cart-col">{{model.product.label}}</div>
        <div class="cart-col">{{model.product.getPrice()}}</div>
        <div class="cart-col">{{model.quantity}}</div>
        <div class="cart-col">{{model.getAmount()}}</div>
        <div class="cart-col"><button (click)="remove()">Remove</button></div>
    `,
    directives: []
})
class CartRowComponent {
    model: CartRow;
    parentModel: Cart;
    constructor() {
    }
    remove() {
        this.parentModel.remove(this.model);
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
            <cart-row *ng-for="#row of model.rows" [model]="row" [parent-model]="model"></cart-row>
        </div>
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
        <p>
            <button (click)="big()">Big</button>
            <button (click)="change()">Change</button>
        </p>
        <cart [model]="cart"></cart>
        <cart-form [model]="cart"></cart-form>
    `,
    directives: [CartComponent, CartFormComponent]
})
class CartExample {
    cart: Cart;
    constructor() {
        this.cart = cartBuilder.getSmall();
    }
    big() {
        this.cart.rows = cartBuilder.getBig().rows;
    }
    change() {
        var n = +(this.cart.rows[1].product.label.split(' ')[1]) + 1;
        this.cart.rows[1] = new CartRow(new Product("REF02", "Product " + n, 22), 1);
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

