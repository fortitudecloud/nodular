"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
require("reflect-metadata");
var nodular_1 = require("nodular");
var index_1 = require("./index");
var socket_decorators_1 = require("./socket.decorators");
var SocketModule;
(function (SocketModule) {
    var ControllerFactory = /** @class */ (function () {
        function ControllerFactory(controller) {
            return [controller];
        }
        ControllerFactory = __decorate([
            nodular_1.Injectable({ factory: true })
        ], ControllerFactory);
        return ControllerFactory;
    }());
    SocketModule.ControllerFactory = ControllerFactory;
    var SocketController = /** @class */ (function () {
        function SocketController() {
        }
        SocketController_1 = SocketController;
        SocketController.prototype.create = function (server) {
            if (!SocketController_1.server)
                SocketController_1.server = server;
            var _server = server;
            //log
            console.log("[SocketController::create] Mounting socket controllers.");
            var loader = nodular_1.NodularContainer.context.getLoader();
            var _this = this;
            var bindEvent = function (controller, setter) {
                var inst = _this.controllerFactory(controller)[0];
                for (var func in inst) {
                    var meta = socket_decorators_1.GetEventSignal(inst, func);
                    if (meta && meta.binder == index_1.ServerModule.decorators.SOCKET_ON)
                        setter({ controller: controller, event: meta.event, action: func });
                }
            };
            // get Controllers
            loader.invoke(index_1.ServerModule.decorators.SOCKET_CONTROLLER, function (controller) {
                // event binders      
                var socketCtrl = _this.controllerFactory(controller)[0];
                if (socketCtrl['onStart'])
                    socketCtrl['onStart']();
                _server.on('connection', function (socket) {
                    if (socketCtrl['onConnection'])
                        socketCtrl['onConnection'](socket);
                    bindEvent(controller, function (context) {
                        socket.on(context.event, function (e) { return socketCtrl[context.action](e, socket); });
                    });
                });
            });
        };
        var SocketController_1;
        __decorate([
            nodular_1.Inject(ControllerFactory)
        ], SocketController.prototype, "controllerFactory", void 0);
        SocketController = SocketController_1 = __decorate([
            nodular_1.Injectable()
        ], SocketController);
        return SocketController;
    }());
    SocketModule.SocketController = SocketController;
    /**
     * Class used to emit signals to the server
     */
    var SocketEmitter = /** @class */ (function () {
        function SocketEmitter() {
        }
        SocketEmitter.prototype.emit = function (event) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = SocketController.server).emit.apply(_a, __spreadArray([event], args));
        };
        SocketEmitter = __decorate([
            nodular_1.Injectable()
        ], SocketEmitter);
        return SocketEmitter;
    }());
    SocketModule.SocketEmitter = SocketEmitter;
})(SocketModule = exports.SocketModule || (exports.SocketModule = {}));
//# sourceMappingURL=socket.controller.js.map