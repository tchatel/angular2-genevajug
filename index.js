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
    var CartRowComponent = (function () {
        function CartRowComponent() {
        }
        CartRowComponent.prototype.remove = function (model, parentModel) {
            return parentModel.remove(model);
        };
        CartRowComponent = __decorate([
            angular2_1.Component({
                selector: 'cart-row',
                properties: ['model', 'parentModel'],
                changeDetection: angular2_1.ON_PUSH
            }),
            angular2_1.View({
                template: "\n        <div class=\"cart-col\">{{model.product.reference}}</div>\n        <div class=\"cart-col\">{{model.product.label}}</div>\n        <div class=\"cart-col\">{{model.product.getPrice()}}</div>\n        <div class=\"cart-col\">{{model.quantity}}</div>\n        <div class=\"cart-col\">{{model.getAmount()}}</div>\n        <div class=\"cart-col\"><button (click)=\"remove(model, parentModel)\">Remove</button></div>\n    "
            }), 
            __metadata('design:paramtypes', [])
        ], CartRowComponent);
        return CartRowComponent;
    })();
    var CartComponent = (function () {
        function CartComponent() {
        }
        CartComponent = __decorate([
            angular2_1.Component({
                selector: 'cart',
                properties: ['model']
            }),
            angular2_1.View({
                template: "\n        <div class=\"rows\">\n            <div class=\"cart-header\">\n                <div class=\"cart-col\">Reference</div>\n                <div class=\"cart-col\">Label</div>\n                <div class=\"cart-col\">Price</div>\n                <div class=\"cart-col\">Quantity</div>\n                <div class=\"cart-col\">Amount</div>\n                <div class=\"cart-col\"></div>\n            </div>\n            <cart-row class=\"cart-row\" *ng-for=\"#cartRow of model.rows\" [model]=\"cartRow\" [parent-model]=\"model\"></cart-row>\n        </div>\n        <p>Model:{{model |\u00A0json}}</p>\n    ",
                directives: [angular2_1.NgFor, CartRowComponent]
            }), 
            __metadata('design:paramtypes', [])
        ], CartComponent);
        return CartComponent;
    })();
    var CartForm = (function () {
        function CartForm(fb) {
            this.form = fb.group({
                product: fb.group({
                    label: ["", angular2_1.Validators.required],
                    reference: ["", angular2_1.Validators.required],
                    price: [undefined, angular2_1.Validators.required]
                }),
                quantity: [undefined, angular2_1.Validators.required]
            });
        }
        CartForm.prototype.add = function () {
            var value = this.form.value, quantity = value.quantity, product = value.product;
            this.model.rows.push(new CartRow(new Product(product.reference, product.label, product.price), quantity));
        };
        CartForm = __decorate([
            angular2_1.Component({
                selector: 'cart-form',
                properties: ['model'],
                appInjector: [angular2_1.FormBuilder]
            }),
            angular2_1.View({
                template: "\n        <h2>Ajout d'une ligne</h2>\n        <form [ng-form-model]=\"form\">\n            <div ng-control-group=\"product\">\n                <p><label>R\u00E9f\u00E9rence <input ng-control=\"reference\" type=\"text\"/></label></p>\n                <p><label>Libell\u00E9 <input ng-control=\"label\" type=\"text\"/></label></p>\n                <p><label>Prix <input ng-control=\"price\" type=\"number\"/></label></p>\n            </div>\n            <p><label>Quantit\u00E9 <input ng-control=\"quantity\" type=\"number\"/></label></p>\n            <p><input type=\"button\" value=\"Ajouter\"  (click)=\"add()\" /></p>\n        </form>\n        <p>{{form.value|json}}</p>\n    ",
                directives: [angular2_1.formDirectives]
            }), 
            __metadata('design:paramtypes', [angular2_1.FormBuilder])
        ], CartForm);
        return CartForm;
    })();
    var CartExample = (function () {
        function CartExample() {
            this.cart = cartBuilder.getSmall();
        }
        CartExample.prototype.change = function () {
            var n = +(this.cart.rows[1].product.label.split(' ')[1]) + 1;
            this.cart.rows[1] = new CartRow(new Product("REF02", "Product " + n, 22), 1);
        };
        CartExample.prototype.big = function () {
            this.cart.rows = cartBuilder.getBig().rows;
        };
        CartExample = __decorate([
            angular2_1.Component({
                selector: 'cart-example'
            }),
            angular2_1.View({
                template: "\n        <p>\n            <button (click)=\"change()\">Change</button>\n            <button (click)=\"big()\">Big</button>\n        </p>\n        <cart [model]=\"cart\"></cart>\n        <cart-form [model]=\"cart\"></cart-form>\n    ",
                directives: [CartComponent, CartForm]
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
