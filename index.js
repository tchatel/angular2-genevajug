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
    var CartFormComponent = (function () {
        function CartFormComponent(fb) {
            this.form = fb.group({
                product: fb.group({
                    reference: ["", angular2_1.Validators.required],
                    label: ["", angular2_1.Validators.required],
                    price: ["", angular2_1.Validators.required]
                }),
                quantity: ["", angular2_1.Validators.required],
            });
        }
        CartFormComponent.prototype.add = function () {
            console.log(this.form);
        };
        CartFormComponent = __decorate([
            angular2_1.Component({
                selector: 'cart-form',
                properties: ['model'],
                appInjector: [angular2_1.FormBuilder]
            }),
            angular2_1.View({
                template: "\n        <form [ng-form-model]=\"form\">\n          <span ng-control-group=\"product\">\n            <label>Reference: <input type=\"text\" ng-control=\"reference\"/></label>\n            <label>Label: <input type=\"text\" ng-control=\"label\"/></label>\n            <label>Price: <input type=\"number\" ng-control=\"price\"/></label>\n          </span>\n            <label>Quantity: <input type=\"number\" ng-control=\"quantity\"/></label>\n            <input type=\"button\" (click)=\"add()\" value=\"Add\" [disabled]=\"!form.valid\"/>\n            <p>FORM : {{form.value |json}}</p>\n        </form>\n    ",
                directives: [angular2_1.formDirectives]
            }), 
            __metadata('design:paramtypes', [angular2_1.FormBuilder])
        ], CartFormComponent);
        return CartFormComponent;
    })();
    var CartRowComponent = (function () {
        function CartRowComponent() {
        }
        CartRowComponent.prototype.remove = function () {
            this.parentModel.remove(this.model);
        };
        CartRowComponent = __decorate([
            angular2_1.Component({
                selector: 'cart-row',
                properties: ['model', 'parentModel']
            }),
            angular2_1.View({
                template: "\n        <div class=\"cart-col\">{{model.product.reference}}</div>\n        <div class=\"cart-col\">{{model.product.label}}</div>\n        <div class=\"cart-col\">{{model.product.getPrice()}}</div>\n        <div class=\"cart-col\">{{model.quantity}}</div>\n        <div class=\"cart-col\">{{model.getAmount()}}</div>\n        <div class=\"cart-col\"><button (click)=\"remove()\">Remove</button></div>\n    ",
                directives: []
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
                template: "\n        <div class=\"rows\">\n            <div class=\"cart-header\">\n                <div class=\"cart-col\">Reference</div>\n                <div class=\"cart-col\">Label</div>\n                <div class=\"cart-col\">Price</div>\n                <div class=\"cart-col\">Quantity</div>\n                <div class=\"cart-col\">Amount</div>\n                <div class=\"cart-col\"></div>\n            </div>\n            <cart-row *ng-for=\"#row of model.rows\" [model]=\"row\" [parent-model]=\"model\"></cart-row>\n        </div>\n        <p>Model:{{model |\u00A0json}}</p>\n    ",
                directives: [angular2_1.NgFor, CartRowComponent]
            }), 
            __metadata('design:paramtypes', [])
        ], CartComponent);
        return CartComponent;
    })();
    var CartExample = (function () {
        function CartExample() {
            this.cart = cartBuilder.getSmall();
        }
        CartExample = __decorate([
            angular2_1.Component({
                selector: 'cart-example'
            }),
            angular2_1.View({
                template: "\n        <cart [model]=\"cart\"></cart>\n        <cart-form [model]=\"cart\"></cart-form>\n    ",
                directives: [CartComponent, CartFormComponent]
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
