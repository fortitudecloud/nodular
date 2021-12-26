"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerModule = void 0;
var nodular_1 = require("nodular");
var index_1 = require("../index");
var socket_controller_1 = require("../socket.controller");
var ControllerModule;
(function (ControllerModule) {
    var AnimalController = /** @class */ (function () {
        function AnimalController() {
            var _this = this;
            this.onConnection = function (socket) {
                console.log('a user connected');
                socket.broadcast.emit('hi');
            };
            this.chat = function (msg) {
                _this.emitter.emit('chat', msg);
            };
            this.chatMessage = function (msg) {
                _this.emitter.emit('chat message', msg);
            };
        }
        __decorate([
            nodular_1.Inject(socket_controller_1.SocketModule.SocketEmitter)
        ], AnimalController.prototype, "emitter", void 0);
        __decorate([
            index_1.On('chat')
        ], AnimalController.prototype, "chat", void 0);
        __decorate([
            index_1.On('chat message')
        ], AnimalController.prototype, "chatMessage", void 0);
        AnimalController = __decorate([
            index_1.SocketController()
        ], AnimalController);
        return AnimalController;
    }());
    ControllerModule.AnimalController = AnimalController;
})(ControllerModule = exports.ControllerModule || (exports.ControllerModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([index_1.ServerModule, socket_controller_1.SocketModule, ControllerModule])
    ], Start);
    return Start;
}());
var controllerFactory = nodular_1.NodularContainer.context.resolve([socket_controller_1.SocketModule.ControllerFactory], function (factory) {
    console.log(factory);
    var inst = factory(ControllerModule.AnimalController);
    console.log(inst);
});
controllerFactory();
//# sourceMappingURL=factory.socket.js.map