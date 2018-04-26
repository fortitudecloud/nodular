"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("./index");
/** socket On */
function On(event) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, [index_1.ServerModule.decorators.SOCKET_ON, event], target);
    };
}
exports.On = On;
/**
 * socketController
 */
function SocketController() {
    return function (target) {
        Reflect.defineMetadata(index_1.ServerModule.decorators.SOCKET_CONTROLLER, {}, target);
    };
}
exports.SocketController = SocketController;
/**
 * Gets the event binding for func
 * @param controller
 * @param action
 */
function GetEventSignal(controller, action) {
    var meta = Reflect.getMetadata(action, controller);
    if (!meta)
        return {};
    return { binder: meta[0], event: meta[1] };
}
exports.GetEventSignal = GetEventSignal;
//# sourceMappingURL=socket.decorators.js.map