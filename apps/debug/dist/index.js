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
var nodular_passport_1 = require("nodular-passport");
var user_1 = require("./user");
var DebugModule;
(function (DebugModule) {
    var DebugHttp = /** @class */ (function () {
        function DebugHttp() {
            this.protect = nodular_passport_1.PassportModule.protect;
            this.home = this.protect([function (req, res) {
                    res.send('Hoggie rises');
                }]);
            this.login = function (req, res) {
                res.send('Not authenticated. Hit the login route with username and password');
            };
        }
        __decorate([
            nodular_server_1.Get('/'),
            __metadata("design:type", Object)
        ], DebugHttp.prototype, "home", void 0);
        __decorate([
            nodular_server_1.Get('/login'),
            __metadata("design:type", Object)
        ], DebugHttp.prototype, "login", void 0);
        DebugHttp = __decorate([
            nodular_server_1.HttpController()
        ], DebugHttp);
        return DebugHttp;
    }());
    DebugModule.DebugHttp = DebugHttp;
})(DebugModule || (DebugModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([nodular_server_1.ServerModule, nodular_server_1.HttpModule, nodular_server_1.HttpController, nodular_passport_1.PassportModule, user_1.UserModule, DebugModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=index.js.map