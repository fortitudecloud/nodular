"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_server_1 = require("nodular-server");
var GetModule;
(function (GetModule) {
    var SimpleGet = /** @class */ (function () {
        function SimpleGet() {
        }
        SimpleGet.prototype.handle = function (req, res, next) {
            res.send('Hi Hoggy');
        };
        SimpleGet = __decorate([
            nodular_server_1.HttpGet('/hoggy')
        ], SimpleGet);
        return SimpleGet;
    }());
    GetModule.SimpleGet = SimpleGet;
})(GetModule = exports.GetModule || (exports.GetModule = {}));
//# sourceMappingURL=get.js.map