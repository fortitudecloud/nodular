"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = exports.HttpModule = exports.ServerModule = void 0;
var nodular_1 = require("nodular");
var bodyParser = require("body-parser");
var express = require("express");
var io = require("socket.io");
var fileUpload = require("express-fileupload");
var rxjs_1 = require("rxjs");
var http_controller_1 = require("./http.controller");
var socket_controller_1 = require("./socket.controller");
var httpServer;
var ServerModule;
(function (ServerModule) {
    var ServerConfig = /** @class */ (function () {
        function ServerConfig() {
            this.binders = [];
        }
        ServerConfig.prototype.bind = function (func) {
            this.binders.push(func);
            // if already bound
            if (this.aRef)
                func(this.aRef);
        };
        ServerConfig.prototype.bindConfigs = function (a) {
            if (!this.aRef)
                this.aRef = a;
            this.binders.forEach(function (e) { return e(a); });
        };
        ServerConfig = __decorate([
            (0, nodular_1.Injectable)({
                singleton: true
            })
        ], ServerConfig);
        return ServerConfig;
    }());
    ServerModule.ServerConfig = ServerConfig;
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
            // enable file uploads
            this.app.use(fileUpload({
                createParentPath: true
            }));
            //mount json form parser
            this.app.use(bodyParser.json({ limit: '50mb' }));
            //mount query string parser
            this.app.use(bodyParser.urlencoded({
                extended: true,
                limit: '50mb'
            }));
            // enable cors requests
            this.app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
                next();
            });
            // custom configs
            this.serverConfig.bindConfigs(this.app);
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
            app.set("port", process.argv[2] || 3000);
            httpServer = http.createServer(app);
            if (server.socketController) {
                var sockserver = io(httpServer);
                server.socketReady.next(sockserver);
            }
            httpServer.listen(process.argv[2] || 3000);
            console.log("Nodular server running on port ".concat(process.argv[2] || 3000, " :)"));
        };
        __decorate([
            (0, nodular_1.Inject)(http_controller_1.HttpModule.HttpController)
        ], Server.prototype, "httpController", void 0);
        __decorate([
            (0, nodular_1.Inject)(socket_controller_1.SocketModule.SocketController)
        ], Server.prototype, "socketController", void 0);
        __decorate([
            (0, nodular_1.Inject)(ServerConfig)
        ], Server.prototype, "serverConfig", void 0);
        Server = __decorate([
            (0, nodular_1.Entry)()
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
__exportStar(require("./http.decorators"), exports);
__exportStar(require("./socket.decorators"), exports);
var http_controller_2 = require("./http.controller");
Object.defineProperty(exports, "HttpModule", { enumerable: true, get: function () { return http_controller_2.HttpModule; } });
var socket_controller_2 = require("./socket.controller");
Object.defineProperty(exports, "SocketModule", { enumerable: true, get: function () { return socket_controller_2.SocketModule; } });
//# sourceMappingURL=index.js.map