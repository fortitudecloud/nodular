"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
var nodular_1 = require("nodular");
var index_1 = require("../index");
var socket_controller_1 = require("../socket.controller");
var http_controller_1 = require("../http.controller");
var path_1 = require("path");
var EventModule;
(function (EventModule) {
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
            (0, nodular_1.Inject)(socket_controller_1.SocketModule.SocketEmitter)
        ], AnimalController.prototype, "emitter", void 0);
        __decorate([
            (0, index_1.On)('chat')
        ], AnimalController.prototype, "chat", void 0);
        __decorate([
            (0, index_1.On)('chat message')
        ], AnimalController.prototype, "chatMessage", void 0);
        AnimalController = __decorate([
            (0, index_1.SocketController)()
        ], AnimalController);
        return AnimalController;
    }());
    EventModule.AnimalController = AnimalController;
    var ChatController = /** @class */ (function () {
        function ChatController() {
            this.home = function (req, res) {
                var path = (0, path_1.resolve)(__dirname + '/chat.html');
                res.sendFile(path);
            };
            this.client = function (req, res) {
                var path = (0, path_1.resolve)(__dirname + '/socket.io.js');
                res.sendFile(path);
            };
        }
        __decorate([
            (0, index_1.Get)('/')
        ], ChatController.prototype, "home", void 0);
        __decorate([
            (0, index_1.Get)('/socket.io.client')
        ], ChatController.prototype, "client", void 0);
        ChatController = __decorate([
            (0, index_1.HttpController)()
        ], ChatController);
        return ChatController;
    }());
    EventModule.ChatController = ChatController;
})(EventModule = exports.EventModule || (exports.EventModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        (0, nodular_1.Nodular)([index_1.ServerModule, http_controller_1.HttpModule, socket_controller_1.SocketModule, EventModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=socket.tests.js.map