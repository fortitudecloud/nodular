"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("nodular");
var nodular_server_1 = require("nodular-server");
var ChatModule;
(function (ChatModule) {
    var ChatHttp = /** @class */ (function () {
        function ChatHttp() {
            this.home = function (req, res) {
                res.send('Dogman');
            };
        }
        __decorate([
            nodular_server_1.Get('/')
        ], ChatHttp.prototype, "home", void 0);
        ChatHttp = __decorate([
            nodular_server_1.HttpController()
        ], ChatHttp);
        return ChatHttp;
    }());
    ChatModule.ChatHttp = ChatHttp;
})(ChatModule || (ChatModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([nodular_server_1.ServerModule, nodular_server_1.HttpModule, nodular_server_1.HttpController, ChatModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=index.js.map