"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("nodular");
var nodular_server_1 = require("nodular-server");
var index_1 = require("../index");
var session = require("express-session");
var passport_local_1 = require("passport-local");
var LocalModule;
(function (LocalModule) {
    var LocalAuth = /** @class */ (function (_super) {
        __extends(LocalAuth, _super);
        function LocalAuth() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.strategy = new passport_local_1.Strategy(function (username, password, done) {
                var user = {
                    id: "1",
                    username: "lhickey",
                    name: "Lionel Hickey"
                };
                if (user.username == username && password == "password")
                    done(null, user);
                else
                    done(null, false);
            });
            _this.session = session({
                secret: 'cookie_secret',
                name: 'kaas',
                resave: false,
                saveUninitialized: true
            });
            _this.home = function (req, res) {
                res.send('<a href="/auth/local">Login</a>');
            };
            _this.success = function (req, res) {
                res.send('Success!');
            };
            _this.fail = function (req, res) {
                res.send('<p>Failed Auth</p><a href="/auth/local">Login Again</a>');
            };
            return _this;
        }
        LocalAuth.prototype.authenticate = function (passport) {
            return passport.authenticate('local', {
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });
        };
        LocalAuth.prototype.serializeUser = function (user, done) {
            done(null, user);
        };
        LocalAuth.prototype.deserializeUser = function (user, done) {
            done(null, user);
        };
        __decorate([
            nodular_server_1.Get('/')
        ], LocalAuth.prototype, "home", void 0);
        __decorate([
            nodular_server_1.Get('/auth/local/success')
        ], LocalAuth.prototype, "success", void 0);
        __decorate([
            nodular_server_1.Get('/login')
        ], LocalAuth.prototype, "fail", void 0);
        LocalAuth = __decorate([
            nodular_server_1.HttpController()
        ], LocalAuth);
        return LocalAuth;
    }(index_1.UserModule.AuthenticationController));
    LocalModule.LocalAuth = LocalAuth;
})(LocalModule || (LocalModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([nodular_server_1.ServerModule, nodular_server_1.HttpModule, index_1.UserModule, LocalModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=local.user.js.map