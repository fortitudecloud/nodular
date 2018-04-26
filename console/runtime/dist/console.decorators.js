"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("./index");
function ConsoleApp() {
    return function (target) {
        Reflect.defineMetadata(index_1.ConsoleModule.decorators.APP, {}, target);
    };
}
exports.ConsoleApp = ConsoleApp;
//# sourceMappingURL=console.decorators.js.map