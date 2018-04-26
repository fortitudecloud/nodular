"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var nodular_server_1 = require("nodular-server");
var ShellModule;
(function (ShellModule) {
    var Client = /** @class */ (function () {
        function Client() {
            this.home = function (req, res) {
                var path = path_1.resolve(__dirname + '/home.html');
                res.sendFile(path);
            };
        }
        __decorate([
            nodular_server_1.Get('/')
        ], Client.prototype, "home", void 0);
        Client = __decorate([
            nodular_server_1.HttpController()
        ], Client);
        return Client;
    }());
    ShellModule.Client = Client;
})(ShellModule = exports.ShellModule || (exports.ShellModule = {}));
//# sourceMappingURL=shell.js.map