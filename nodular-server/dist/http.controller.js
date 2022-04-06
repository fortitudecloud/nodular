"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
require("reflect-metadata");
var nodular_1 = require("nodular");
var http_decorators_1 = require("./http.decorators");
var index_1 = require("./index");
var HttpModule;
(function (HttpModule) {
    var ControllerFactory = /** @class */ (function () {
        function ControllerFactory(controller) {
            return [controller];
        }
        ControllerFactory = __decorate([
            (0, nodular_1.Injectable)({ factory: true })
        ], ControllerFactory);
        return ControllerFactory;
    }());
    HttpModule.ControllerFactory = ControllerFactory;
    var HttpController = /** @class */ (function () {
        /**
         * Constructor
         *
         * @class HttpController
         * @constructor
         */
        function HttpController() {
        }
        /**
         * Create the routes.
         *
         * @class SystemController
         * @method create configures the router for use on the server
         */
        HttpController.prototype.create = function (router) {
            //log
            console.log("[HttpController::create] Mounting http controllers.");
            var loader = nodular_1.NodularContainer.context.getLoader();
            var _this = this;
            var setVerbAction = function (controller, verb, setter) {
                var inst = _this.controllerFactory(controller)[0];
                for (var func in inst) {
                    var meta = (0, http_decorators_1.GetVerbRoute)(inst, func);
                    if (meta && meta.verb == verb)
                        setter({ controller: controller, path: meta.route, action: func });
                }
            };
            // get Controllers
            loader.invoke(index_1.ServerModule.decorators.HTTP_CONTROLLER, function (controller) {
                // set get routes                
                setVerbAction(controller, index_1.ServerModule.decorators.HTTP_GET, function (context) {
                    return _this.get(router, context);
                });
                // set post routes
                setVerbAction(controller, index_1.ServerModule.decorators.HTTP_POST, function (context) {
                    return _this.post(router, context);
                });
                // set put routes
                setVerbAction(controller, index_1.ServerModule.decorators.HTTP_PUT, function (context) {
                    return _this.put(router, context);
                });
                // set delete routes
                setVerbAction(controller, index_1.ServerModule.decorators.HTTP_DELETE, function (context) {
                    return _this.delete(router, context);
                });
                // set patch routes
                setVerbAction(controller, index_1.ServerModule.decorators.HTTP_PATCH, function (context) {
                    return _this.patch(router, context);
                });
            });
        };
        /**
         * http Get
         * @param router
         * @param context
         */
        HttpController.prototype.get = function (router, context) {
            var handle = this.controllerFactory(context.controller)[0][context.action];
            if (Array.isArray(handle)) {
                router.get(context.path, handle);
            }
            else {
                router.get(context.path, function (req, res, next) {
                    handle(req, res, next);
                });
            }
        };
        /**
         * http Post
         * @param router
         * @param context
         */
        HttpController.prototype.post = function (router, context) {
            var handle = this.controllerFactory(context.controller)[0][context.action];
            if (Array.isArray(handle)) {
                router.post(context.path, handle);
            }
            else {
                router.post(context.path, function (req, res, next) {
                    handle(req, res, next);
                });
            }
        };
        /**
         * http Put
         * @param router
         * @param context
         */
        HttpController.prototype.put = function (router, context) {
            var handle = this.controllerFactory(context.controller)[0][context.action];
            if (Array.isArray(handle)) {
                router.put(context.path, handle);
            }
            else {
                router.put(context.path, function (req, res, next) {
                    handle(req, res, next);
                });
            }
        };
        /**
         * http Delete
         * @param router
         * @param context
         */
        HttpController.prototype.delete = function (router, context) {
            var handle = this.controllerFactory(context.controller)[0][context.action];
            if (Array.isArray(handle)) {
                router.delete(context.path, handle);
            }
            else {
                router.delete(context.path, function (req, res, next) {
                    handle(req, res, next);
                });
            }
        };
        /**
         * http Patch
         * @param router
         * @param context
         */
        HttpController.prototype.patch = function (router, context) {
            var handle = this.controllerFactory(context.controller)[0][context.action];
            if (Array.isArray(handle)) {
                router.patch(context.path, handle);
            }
            else {
                router.patch(context.path, function (req, res, next) {
                    handle(req, res, next);
                });
            }
        };
        __decorate([
            (0, nodular_1.Inject)(ControllerFactory)
        ], HttpController.prototype, "controllerFactory", void 0);
        HttpController = __decorate([
            (0, nodular_1.Injectable)()
        ], HttpController);
        return HttpController;
    }());
    HttpModule.HttpController = HttpController;
})(HttpModule = exports.HttpModule || (exports.HttpModule = {}));
//# sourceMappingURL=http.controller.js.map