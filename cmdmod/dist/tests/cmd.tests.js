"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("nodular");
var index_1 = require("../index");
var HelloMod;
(function (HelloMod) {
    var HelloCmd = /** @class */ (function () {
        function HelloCmd() {
        }
        HelloCmd.prototype.run = function (text, options) {
            if (options && options.fname) {
                console.log('hello. Your name is ' + options.fname);
            }
            else {
                console.debug('hello ' + text);
            }
        };
        HelloCmd = __decorate([
            index_1.Cmd({
                command: 'hw [text]',
                description: 'Helloworld command app',
                switches: [{ short: '-n', long: '--fname <nm>', desc: 'Your name' }]
            })
        ], HelloCmd);
        return HelloCmd;
    }());
    HelloMod.HelloCmd = HelloCmd;
})(HelloMod = exports.HelloMod || (exports.HelloMod = {}));
var Start = /** @class */ (function () {
    function Start() {
    }
    Start = __decorate([
        nodular_1.Nodular([HelloMod])
    ], Start);
    return Start;
}());
//# sourceMappingURL=cmd.tests.js.map