"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("./index");
/** http Get */
function Get(route) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, [index_1.ServerModule.decorators.HTTP_GET, route], target);
    };
}
exports.Get = Get;
/** http Post */
function Post(route) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, [index_1.ServerModule.decorators.HTTP_POST, route], target);
    };
}
exports.Post = Post;
/** http Put */
function Put(route) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, [index_1.ServerModule.decorators.HTTP_PUT, route], target);
    };
}
exports.Put = Put;
/** http Delete */
function Delete(route) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, [index_1.ServerModule.decorators.HTTP_DELETE, route], target);
    };
}
exports.Delete = Delete;
/** http Patch */
function Patch(route) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, [index_1.ServerModule.decorators.HTTP_PATCH, route], target);
    };
}
exports.Patch = Patch;
/** http Base path */
function HttpController() {
    return function (target) {
        Reflect.defineMetadata(index_1.ServerModule.decorators.HTTP_CONTROLLER, {}, target);
    };
}
exports.HttpController = HttpController;
/**
 * Fetch the controller action metadata for servicing web requests
 * @param controller
 * @param action
 */
function GetVerbRoute(controller, action) {
    var meta = Reflect.getMetadata(action, controller);
    if (!meta)
        return {};
    return { verb: meta[0], route: meta[1] };
}
exports.GetVerbRoute = GetVerbRoute;
//# sourceMappingURL=http.decorators.js.map