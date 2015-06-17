import {
    bootstrap,
    NgFor,
    Component,
    View,
    formDirectives,
    FormBuilder, ControlGroup,
    Control,
    Validators,
    ON_PUSH
} from 'angular2/angular2';


@Component({
    selector: 'cart-row',
    properties: ['model', 'parentModel' ],
    changeDetection: ON_PUSH
})
@View({
    template: `
        <div class="cart-col">{{model.product.reference}}</div>
        <div class="cart-col">{{model.product.label}}</div>
        <div class="cart-col">{{model.product.getPrice()}}</div>
        <div class="cart-col">{{model.quantity}}</div>
        <div class="cart-col">{{model.getAmount()}}</div>
        <div class="cart-col"><button (click)="remove(model, parentModel)">Remove</button></div>
    `
})
class CartRowComponent {
    model: CartRow;
    parentModel: Cart;
    constructor() {
    }
    remove(model: CartRow, parentModel: Cart) {
        return parentModel.remove(model);
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
            <cart-row class="cart-row" *ng-for="#cartRow of model.rows" [model]="cartRow" [parent-model]="model"></cart-row>
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
    selector: 'cart-form',
    properties: ['model'],
    appInjector: [FormBuilder]
})
@View({
    template: `
        <h2>Ajout d'une ligne</h2>
        <form [ng-form-model]="form">
            <div ng-control-group="product">
                <p><label>Référence <input ng-control="reference" type="text"/></label></p>
                <p><label>Libellé <input ng-control="label" type="text"/></label></p>
                <p><label>Prix <input ng-control="price" type="number"/></label></p>
            </div>
            <p><label>Quantité <input ng-control="quantity" type="number"/></label></p>
            <p><input type="button" value="Ajouter"  (click)="add()" /></p>
        </form>
        <p>{{form.value|json}}</p>
    `,
    directives: [formDirectives]
})
class CartForm {
    model: Cart;
    form: ControlGroup;
    constructor(fb: FormBuilder) {
        this.form = fb.group({
            product: fb.group({
                label: ["", Validators.required],
                reference: ["", Validators.required],
                price: [undefined, Validators.required]
            }),
            quantity: [undefined, Validators.required]
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
    selector: 'cart-example'
})
@View({
    template: `
        <p>
            <button (click)="change()">Change</button>
            <button (click)="big()">Big</button>
        </p>
        <cart [model]="cart"></cart>
        <cart-form [model]="cart"></cart-form>
    `,
    directives: [CartComponent, CartForm]
})
class CartExample {
    cart: Cart;
    constructor() {
        this.cart = cartBuilder.getSmall();
    }
    change() {
        var n = +(this.cart.rows[1].product.label.split(' ')[1]) + 1;
        this.cart.rows[1] = new CartRow(new Product("REF02", "Product " + n, 22), 1);
    }
    big() {
        this.cart.rows = cartBuilder.getBig().rows;
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

