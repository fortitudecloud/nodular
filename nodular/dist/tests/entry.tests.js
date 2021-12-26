"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryModule = void 0;
var nodular_1 = require("../nodular");
var EntryModule;
(function (EntryModule) {
    var Runner = /** @class */ (function () {
        function Runner() {
            this.Message = 'We are running';
        }
        Runner = __decorate([
            nodular_1.Injectable()
        ], Runner);
        return Runner;
    }());
    EntryModule.Runner = Runner;
    var EntryClass = /** @class */ (function () {
        function EntryClass() {
        }
        EntryClass.run = function (e) {
            console.log(e.runner.Message);
        };
        __decorate([
            nodular_1.Inject(Runner)
        ], EntryClass.prototype, "runner", void 0);
        EntryClass = __decorate([
            nodular_1.Entry()
        ], EntryClass);
        return EntryClass;
    }());
    EntryModule.EntryClass = EntryClass;
})(EntryModule = exports.EntryModule || (exports.EntryModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([EntryModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=entry.tests.js.map