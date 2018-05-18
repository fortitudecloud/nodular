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
var nodular_server_1 = require("nodular-server");
var nodular_passport_1 = require("nodular-passport");
var session = require("express-session");
var passport_local_1 = require("passport-local");
var UserModule;
(function (UserModule) {
    var UserController = /** @class */ (function (_super) {
        __extends(UserController, _super);
        function UserController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.strategy = new passport_local_1.Strategy(function (username, password, done) {
                var _u = _this.db.getData('/' + username);
                if (_u)
                    done(null, _u);
                else
                    done(null, false);
            });
            return _this;
        }
        UserController.prototype.onInit = function () {
            // use express session storage
            this.config.bind(function (app) {
                app.use(session({
                    secret: 'cookie_secret',
                    name: 'kaas',
                    resave: false,
                    saveUninitialized: true
                }));
            });
            // get JsonDB reference
            // var filename = path.resolve(__dirname, 'db.json');
            // console.log(filename);
            // this.db = new JsonDB(filename, true, true);
            _super.prototype.onInit.call(this);
        };
        UserController.prototype.authenticate = function (passport) {
            return passport.authenticate('local', {
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });
        };
        UserController.prototype.serializeUser = function (user, done) {
            done(null, user.id);
        };
        UserController.prototype.deserializeUser = function (user, done) {
            var _u = this.db.getData('/' + user);
            done(null, _u);
        };
        UserController = __decorate([
            nodular_server_1.HttpController()
        ], UserController);
        return UserController;
    }(nodular_passport_1.PassportModule.AuthenticationController));
    UserModule.UserController = UserController;
})(UserModule = exports.UserModule || (exports.UserModule = {}));
//# sourceMappingURL=user.js.map