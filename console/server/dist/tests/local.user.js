"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("nodular");
var nodular_server_1 = require("nodular-server");
var passport_local_1 = require("passport-local");
var JsonDB = require("node-json-db");
var LocalModule;
(function (LocalModule) {
    var LocalAuth = /** @class */ (function () {
        function LocalAuth() {
            this.name = 'local';
            this.db = new JsonDB('users', true, false);
        }
        LocalAuth.prototype.getStrategy = function () {
            var _this = this;
            return new passport_local_1.Strategy(function (username, password, done) {
                var user = _this.db.getData('/' + username);
                if (!user)
                    return done(null, false);
                else
                    return done(null, user);
            });
        };
        LocalAuth = __decorate([
            nodular_1.Injectable({
                bind: function () { return "AUTH"; },
                singleton: true
            })
        ], LocalAuth);
        return LocalAuth;
    }());
    LocalModule.LocalAuth = LocalAuth;
    var AppController = /** @class */ (function () {
        function AppController() {
            this.home = function (req, res) {
                res.send('<a href="/auth/local">Login</a>');
            };
            this.success = function (req, res) {
                res.send('Success!');
            };
            this.fail = function (req, res) {
                res.send('<p>Failed Auth</p><a href="/auth/local">Login Again</a>');
            };
        }
        __decorate([
            nodular_server_1.Get('/')
        ], AppController.prototype, "home", void 0);
        __decorate([
            nodular_server_1.Get('/auth/local/success')
        ], AppController.prototype, "success", void 0);
        __decorate([
            nodular_server_1.Get('/login')
        ], AppController.prototype, "fail", void 0);
        AppController = __decorate([
            nodular_server_1.HttpController()
        ], AppController);
        return AppController;
    }());
    LocalModule.AppController = AppController;
})(LocalModule || (LocalModule = {}));
//# sourceMappingURL=local.user.js.map