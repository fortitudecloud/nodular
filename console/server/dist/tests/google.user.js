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
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
var passport_google_oauth20_1 = require("passport-google-oauth20");
var GoogleModule;
(function (GoogleModule) {
    var GOOGLE_CLIENT_ID = '1090226470090-rp4kusnm3tls79oeb3pt2emnmf7u4pdh.apps.googleusercontent.com';
    var GOOGLE_CLIENT_SECRET = '3AymfnvIBGe71wimkfChQxO1';
    var GoogleAuth = /** @class */ (function () {
        function GoogleAuth() {
            this.name = 'google';
        }
        GoogleAuth.prototype.getStrategy = function () {
            return new passport_google_oauth20_1.Strategy({
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                //NOTE :
                //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
                //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/ 
                //then edit your /etc/hosts local file to point on your private IP. 
                //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
                //if you use it.
                callbackURL: "http://localhost:3000/auth/google/return",
                passReqToCallback: true
            }, function (request, accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
                    // To keep the example simple, the user's Google profile is returned to
                    // represent the logged-in user.  In a typical application, you would want
                    // to associate the Google account with a user record in your database,
                    // and return that user instead.
                    return done(null, profile);
                });
            });
        };
        GoogleAuth = __decorate([
            nodular_1.Injectable({
                // resolver: () => new GoogleStrategy({
                //                 clientID: GOOGLE_CLIENT_ID,
                //                 clientSecret: GOOGLE_CLIENT_SECRET,
                //                 callbackURL: "http://localhost:3000/auth/google/return"
                //               },
                //               function(accessToken, refreshToken, profile, cb) {
                //                 // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //                 //   return cb(err, user);
                //                 // });
                //                 return cb(null, profile);
                //               }),
                bind: function () { return "AUTH"; },
                singleton: true
                //factory: true
            })
        ], GoogleAuth);
        return GoogleAuth;
    }());
    GoogleModule.GoogleAuth = GoogleAuth;
    var AppController = /** @class */ (function () {
        function AppController() {
            this.home = function (req, res) {
                res.send('<a href="/auth/google">Login</a>');
            };
            this.success = function (req, res) {
                res.send('Success!');
            };
            this.fail = function (req, res) {
                res.send('<p>Failed Auth</p><a href="/auth/google">Login Again</a>');
            };
        }
        __decorate([
            nodular_server_1.Get('/')
        ], AppController.prototype, "home", void 0);
        __decorate([
            nodular_server_1.Get('/auth/google/success')
        ], AppController.prototype, "success", void 0);
        __decorate([
            nodular_server_1.Get('/login')
        ], AppController.prototype, "fail", void 0);
        AppController = __decorate([
            nodular_server_1.HttpController()
        ], AppController);
        return AppController;
    }());
    GoogleModule.AppController = AppController;
})(GoogleModule || (GoogleModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([nodular_server_1.ServerModule, nodular_server_1.HttpModule, index_1.UserModule, GoogleModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=google.user.js.map