"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("../nodular");
var EntryModule;
(function (EntryModule) {
    var EntryClass = /** @class */ (function () {
        function EntryClass() {
        }
        EntryClass.run = function (e) {
            console.log(e.runner.Message);
        };
        __decorate([
            nodular_1.Inject('bindClass')
        ], EntryClass.prototype, "runner", void 0);
        EntryClass = __decorate([
            nodular_1.Entry()
        ], EntryClass);
        return EntryClass;
    }());
    EntryModule.EntryClass = EntryClass;
})(EntryModule = exports.EntryModule || (exports.EntryModule = {}));
// Add MOD
nodular_1.Mod(EntryModule);
var RuntimeMod;
(function (RuntimeMod) {
    var Runner = /** @class */ (function () {
        function Runner() {
            this.Message = 'We are running';
        }
        Runner = __decorate([
            nodular_1.Injectable({
                bind: function () { return 'bindClass'; }
            })
        ], Runner);
        return Runner;
    }());
    RuntimeMod.Runner = Runner;
})(RuntimeMod || (RuntimeMod = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([RuntimeMod])
    ], Start);
    return Start;
}());
//# sourceMappingURL=mod.tests.js.map