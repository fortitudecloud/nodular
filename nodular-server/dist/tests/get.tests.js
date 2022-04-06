"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetModule = void 0;
var nodular_1 = require("nodular");
var index_1 = require("../index");
var http_controller_1 = require("../http.controller");
var GetModule;
(function (GetModule) {
    var AnimalController = /** @class */ (function () {
        function AnimalController() {
            this.dog = function (req, res) {
                res.send('The dogs name is Hoggy!');
            };
            this.puma = function (req, res) {
                res.send('The cats name is Puma!');
            };
            this.middle = [function (req, res, next) {
                    req.msg = 'Middleware message';
                    next();
                }, function (req, res) {
                    res.send(req.msg);
                }];
        }
        __decorate([
            (0, index_1.Get)('/hoggy')
        ], AnimalController.prototype, "dog", void 0);
        __decorate([
            (0, index_1.Get)('/puma')
        ], AnimalController.prototype, "puma", void 0);
        __decorate([
            (0, index_1.Get)('/middle')
        ], AnimalController.prototype, "middle", void 0);
        AnimalController = __decorate([
            (0, index_1.HttpController)()
        ], AnimalController);
        return AnimalController;
    }());
    GetModule.AnimalController = AnimalController;
})(GetModule = exports.GetModule || (exports.GetModule = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        (0, nodular_1.Nodular)([index_1.ServerModule, http_controller_1.HttpModule, GetModule])
    ], Start);
    return Start;
}());
//# sourceMappingURL=get.tests.js.map