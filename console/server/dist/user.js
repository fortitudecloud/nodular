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
var passport_1 = require("passport");
var UserModule;
(function (UserModule) {
    var Authentication = /** @class */ (function () {
        function Authentication() {
            var _this = this;
            this.auth = function (req, res) {
                return _this.passport.authenticate(req.params.provider);
            };
            this.authReturn = function (req, res) {
                return [_this.passport.authenticate(req.params.provider), function (req, res) {
                        res.redirect('/auth/' + req.params.provider + '/success');
                    }];
            };
        }
        Authentication.prototype.onInit = function () {
            var passport = new passport_1.Passport();
            passport.use(this.authStrategy);
            // todo: replace these with a service from the implementer
            passport.serializeUser(function (user, cb) {
                cb(null, user);
            });
            passport.deserializeUser(function (obj, cb) {
                cb(null, obj);
            });
            this.config.bind(function (app) {
                // todo: replace this with a session service from the implementer
                app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
                app.use(passport.initialize());
                app.use(passport.session());
            });
            this.passport = passport;
        };
        __decorate([
            nodular_1.Inject(nodular_server_1.ServerModule.ServerConfig)
        ], Authentication.prototype, "config", void 0);
        __decorate([
            nodular_1.Inject("AUTH")
        ], Authentication.prototype, "authStrategy", void 0);
        __decorate([
            nodular_server_1.Get('/auth/:provider')
        ], Authentication.prototype, "auth", void 0);
        __decorate([
            nodular_server_1.Get('/auth/:provider/return')
        ], Authentication.prototype, "authReturn", void 0);
        Authentication = __decorate([
            nodular_server_1.HttpController()
        ], Authentication);
        return Authentication;
    }());
    UserModule.Authentication = Authentication;
})(UserModule = exports.UserModule || (exports.UserModule = {}));
//# sourceMappingURL=user.js.map