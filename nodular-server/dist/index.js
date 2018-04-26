"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("nodular");
var bodyParser = require("body-parser");
var express = require("express");
var io = require("socket.io");
var rxjs_1 = require("rxjs");
var http_controller_1 = require("./http.controller");
var socket_controller_1 = require("./socket.controller");
var httpServer;
var ServerModule;
(function (ServerModule) {
    var Server = /** @class */ (function () {
        function Server() {
            this.socketReady = new rxjs_1.Subject();
        }
        Server.prototype.onInit = function () {
            //create expressjs application
            this.app = express();
            // configuration
            this.config();
            // http routes
            if (this.httpController)
                this.http();
            // socket binders
            if (this.socketController)
                this.socket();
        };
        /**
         * Configure application
         *
         * @class Grapple
         * @method config
         */
        Server.prototype.config = function () {
            //mount json form parser
            this.app.use(bodyParser.json());
            //mount query string parser
            this.app.use(bodyParser.urlencoded({
                extended: true
            }));
            // enable cors requests
            this.app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
                next();
            });
        };
        Server.prototype.http = function () {
            var router;
            router = express.Router();
            // Http Controller
            this.httpController.create(router);
            // use http router
            this.app.use(router);
        };
        Server.prototype.socket = function () {
            var _this = this;
            this.socketReady.subscribe(function (ioServer) {
                _this.socketController.create(ioServer);
            });
        };
        Server.run = function (server) {
            var http = require("http");
            var app = server.app;
            app.set("port", 3000);
            httpServer = http.createServer(app);
            if (server.socketController) {
                var sockserver = io(httpServer);
                server.socketReady.next(sockserver);
            }
            httpServer.listen(3000);
            console.log('Nodular server running on port 3000 :)');
        };
        __decorate([
            nodular_1.Inject(http_controller_1.HttpModule.HttpController)
        ], Server.prototype, "httpController", void 0);
        __decorate([
            nodular_1.Inject(socket_controller_1.SocketModule.SocketController)
        ], Server.prototype, "socketController", void 0);
        Server = __decorate([
            nodular_1.Entry()
        ], Server);
        return Server;
    }());
    ServerModule.Server = Server;
    ServerModule.decorators = {
        TRIGGER: "TRIGGER",
        APIWARE: "APIWARE",
        HTTP_GET: "HTTP_GET",
        HTTP_POST: "HTTP_POST",
        HTTP_PUT: "HTTP_PUT",
        HTTP_DELETE: "HTTP_DELETE",
        HTTP_PATCH: "HTTP_PATCH",
        HTTP_CONTROLLER: "HTTP_CONTROLLER",
        SOCKET_ON: "SOCKET_ON",
        SOCKET_CONTROLLER: "SOCKET_CONTROLLER"
    };
})(ServerModule = exports.ServerModule || (exports.ServerModule = {}));
// exports
__export(require("./http.decorators"));
__export(require("./socket.decorators"));
var http_controller_2 = require("./http.controller");
exports.HttpModule = http_controller_2.HttpModule;
var socket_controller_2 = require("./socket.controller");
exports.SocketModule = socket_controller_2.SocketModule;
//# sourceMappingURL=index.js.map