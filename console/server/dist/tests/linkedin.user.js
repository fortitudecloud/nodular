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
var index_1 = require("../index");
var passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
var LinkedInModule;
(function (LinkedInModule) {
    var LINKEDIN_KEY = '86ipy93pcttzkg';
    var LINKEDIN_SECRET = 'SnoUutEAgrpuHQUv';
    var LinkedInAuth = /** @class */ (function () {
        function LinkedInAuth() {
            this.name = 'linkedin';
        }
        LinkedInAuth.prototype.getStrategy = function () {
            return new passport_linkedin_oauth2_1.Strategy({
                clientID: LINKEDIN_KEY,
                clientSecret: LINKEDIN_SECRET,
                callbackURL: "http://localhost:3000/auth/linkedin/return",
                scope: ['r_emailaddress', 'r_basicprofile'],
                state: true
            }, function (accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
                    // To keep the example simple, the user's LinkedIn profile is returned to
                    // represent the logged-in user. In a typical application, you would want
                    // to associate the LinkedIn account with a user record in your database,
                    // and return that user instead.
                    return done(null, profile);
                });
            });
        };
        LinkedInAuth = __decorate([
            nodular_1.Injectable({
                bind: function () { return "AUTH"; },
                singleton: true
            })
        ], LinkedInAuth);
        return LinkedInAuth;
    }());
    LinkedInModule.LinkedInAuth = LinkedInAuth;
    var AppController = /** @class */ (function () {
        function AppController() {
            this.home = function (req, res) {
                res.send('<a href="/auth/linkedin">Login</a>');
            };
            this.success = function (req, res) {
                res.send('Success!');
            };
            this.fail = function (req, res) {
                res.send('<p>Failed Auth</p><a href="/auth/linkedin">Login Again</a>');
            };
        }
        __decorate([
            nodular_server_1.Get('/')
        ], AppController.prototype, "home", void 0);
        __decorate([
            nodular_server_1.Get('/auth/linkedin/success')
        ], AppController.prototype, "success", void 0);
        __decorate([
            nodular_server_1.Get('/login')
        ], AppController.prototype, "fail", void 0);
        AppController = __decorate([
            nodular_server_1.HttpController()
        ], AppController);
        return AppController;
    }());
    LinkedInModule.AppController = AppController;
})(LinkedInModule || (LinkedInModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([nodular_server_1.ServerModule, nodular_server_1.HttpModule, index_1.UserModule, LinkedInModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=linkedin.user.js.map