"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("./nodular");
var lib_1 = require("./lib");
var App;
(function (App) {
    var Fruit = /** @class */ (function () {
        function Fruit() {
        }
        return Fruit;
    }());
    App.Fruit = Fruit;
})(App = exports.App || (exports.App = {}));
var Main = /** @class */ (function () {
    function Main() {
    }
    Main = __decorate([
        nodular_1.Nodular([lib_1.Client, App])
    ], Main);
    return Main;
}());
//# sourceMappingURL=index.js.map