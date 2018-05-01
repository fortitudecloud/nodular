"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io-client");
var rxjs_1 = require("rxjs");
/**
 * Console client application API
 */
var ConsoleClient = /** @class */ (function () {
    function ConsoleClient() {
    }
    /**
     * Connects to Console server instance
     * @param address
     */
    ConsoleClient.prototype.connect = function (address, scope) {
        this.socket = socketIo(address);
        this.scope = scope;
    };
    /**
     * Sends user messages
     * @param message
     */
    ConsoleClient.prototype.sendUserMessage = function (message) {
        this.socket.emit('console.user.message', message);
    };
    /**
     * Subscribe to user messages
     */
    ConsoleClient.prototype.onUserMessage = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('console.user.message', function (data) { return observer.next(data); });
        });
    };
    ConsoleClient.prototype.send = function (event, payload) {
        this.socket.emit(event, payload);
    };
    ConsoleClient.prototype.onEvent = function (event) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on(event, function (data) { return observer.next(data); });
        });
    };
    return ConsoleClient;
}());
exports.ConsoleClient = ConsoleClient;
//# sourceMappingURL=index.js.map