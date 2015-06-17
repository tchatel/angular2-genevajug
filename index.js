if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'angular2/angular2'], function (require, exports, angular2_1) {
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
    var CartExample = (function () {
        function CartExample() {
        }
        CartExample = __decorate([
            angular2_1.Component({
                selector: 'cart-example'
            }),
            angular2_1.View({
                template: "\n        <input #name (keyup)/>\n        <h1>Hello {{name.value}}</h1>\n    ",
                directives: []
            }), 
            __metadata('design:paramtypes', [])
        ], CartExample);
        return CartExample;
    })();
    var Cart = (function () {
        function Cart(rows) {
            if (rows === void 0) { rows = []; }
            this.rows = rows;
        }
        Cart.prototype.remove = function (row) {
            var index = this.rows.indexOf(row);
            this.rows.splice(index, 1);
        };
        return Cart;
    })();
    var CartRow = (function () {
        function CartRow(product, quantity) {
            this.product = product;
            this.quantity = quantity;
        }
        CartRow.prototype.getAmount = function () {
            return this.product.price * this.quantity;
        };
        return CartRow;
    })();
    var Product = (function () {
        function Product(reference, label, price) {
            this.reference = reference;
            this.label = label;
            this.price = price;
        }
        Product.prototype.getPrice = function () {
            //console.log("getPrice()");
            return this.price;
        };
        return Product;
    })();
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
            for (var i = 0; i < 2000; i++) {
                cart.rows.push(new CartRow(new Product("REF" + i, "Product " + i, 10 + i), 1));
            }
            return cart;
        }
    };
    angular2_1.bootstrap(CartExample);
});
