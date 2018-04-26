"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorators_1 = require("./decorators");
exports.nodularModules = [];
/**
 *
 * @param options
 */
function Nodular(modules) {
    modules.forEach(function (m) { return exports.nodularModules.push(m); });
    // if(nodularModules.length > 1) console.log(nodularModules);
    console.log(exports.nodularModules);
    return function (target) {
        modules.forEach(function (v) { return Reflect.defineMetadata(decorators_1.default.nodular, v, target); });
    };
}
exports.Nodular = Nodular;
//# sourceMappingURL=nodular.js.map