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
//import { Strategy, Passport, PassportStatic, Authenticator } from 'passport';
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var UserModule;
(function (UserModule) {
    var AuthenticationController = /** @class */ (function () {
        function AuthenticationController() {
            this.auth = this.authenticate(passport);
        }
        AuthenticationController.prototype.onInit = function () {
            var _this = this;
            passport.serializeUser(this.serializeUser);
            passport.deserializeUser(this.deserializeUser);
            passport.use(this.strategy);
            this.config.bind(function (app) {
                app.use(cookieParser());
                app.use(_this.session);
                app.use(passport.initialize());
                app.use(passport.session());
            });
        };
        __decorate([
            nodular_1.Inject(nodular_server_1.ServerModule.ServerConfig)
        ], AuthenticationController.prototype, "config", void 0);
        __decorate([
            nodular_server_1.Get('/auth/:provider')
        ], AuthenticationController.prototype, "auth", void 0);
        return AuthenticationController;
    }());
    UserModule.AuthenticationController = AuthenticationController;
    //@HttpController()
    var Authentication = /** @class */ (function () {
        function Authentication() {
            this.auth = 
            // (req, res, next) => { 
            //     console.log(this.authStrategy.name);
            //     passport.authenticate(this.authStrategy.name)(req, res, next) 
            // }
            //passport.authenticate('local');
            passport.authenticate('local', {
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });
            this.authReturn = 
            // [this.passport.authenticate('google'), (req, res) => {
            //     res.redirect('/auth/' + req.params.provider + '/success');
            // }];            
            passport.authenticate('local', {
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });
        }
        Authentication.prototype.onInit = function () {
            // TODO: replace all below with implementers service code
            passport.serializeUser(function (user, done) {
                done(null, user);
            });
            passport.deserializeUser(function (obj, done) {
                done(null, obj);
            });
            passport.use(this.authStrategy.getStrategy());
            this.config.bind(function (app) {
                app.use(cookieParser());
                app.use(session({
                    secret: 'cookie_secret',
                    name: 'kaas',
                    resave: false,
                    saveUninitialized: true
                }));
                app.use(passport.initialize());
                app.use(passport.session());
            });
            //this.passport = passport;
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
        return Authentication;
    }());
    UserModule.Authentication = Authentication;
})(UserModule = exports.UserModule || (exports.UserModule = {}));
//# sourceMappingURL=user.js.map