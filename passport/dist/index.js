"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("nodular");
var nodular_server_1 = require("nodular-server");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var connect = require("connect-ensure-login");
var PassportModule;
(function (PassportModule) {
    var AuthenticationController = /** @class */ (function () {
        function AuthenticationController() {
            this.auth = this.authenticate(passport);
        }
        AuthenticationController.prototype.onInit = function () {
            passport.serializeUser(this.serializeUser);
            passport.deserializeUser(this.deserializeUser);
            passport.use(this.strategy);
            this.config.bind(function (app) {
                app.use(cookieParser());
                app.use(passport.initialize());
                app.use(passport.session());
            });
        };
        __decorate([
            nodular_1.Inject(nodular_server_1.ServerModule.ServerConfig),
            __metadata("design:type", Object)
        ], AuthenticationController.prototype, "config", void 0);
        __decorate([
            nodular_server_1.Get('/auth/:provider'),
            __metadata("design:type", Object)
        ], AuthenticationController.prototype, "auth", void 0);
        return AuthenticationController;
    }());
    PassportModule.AuthenticationController = AuthenticationController;
    function protect(handles) {
        var handlers = [];
        handlers.push(connect.ensureLoggedIn());
        handles.forEach(function (v) { return handlers.push(v); });
        return handlers;
    }
    PassportModule.protect = protect;
})(PassportModule = exports.PassportModule || (exports.PassportModule = {}));
//# sourceMappingURL=index.js.map