"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var nodular_1 = require("nodular");
var program = require("commander");
var CMDMod;
(function (CMDMod) {
    var Run = /** @class */ (function () {
        function Run() {
        }
        Run.run = function (command) {
            var options = Reflect.getMetadata('cmd', command.cmd.__proto__.constructor);
            var prog = program
                .command(options.command)
                .description(options.description);
            options.switches.forEach(function (v) {
                prog.option(v.short + ", " + v.long + ", " + v.desc);
            });
            prog.action(function () {
                var a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    a[_i] = arguments[_i];
                }
                var _a;
                return (_a = command.cmd).run.apply(_a, a);
            });
            program.parse(process.argv);
        };
        __decorate([
            nodular_1.Inject('Command')
        ], Run.prototype, "cmd", void 0);
        Run = __decorate([
            nodular_1.Entry()
        ], Run);
        return Run;
    }());
    CMDMod.Run = Run;
})(CMDMod = exports.CMDMod || (exports.CMDMod = {}));
function Cmd(cmd, options) {
    return function (target) {
        if (options)
            options.bind = function () { return 'Command'; };
        else
            options = { bind: function () { return 'Command'; } };
        Reflect.defineMetadata('injectable', options || {}, target);
        Reflect.defineMetadata('cmd', cmd, target);
    };
}
exports.Cmd = Cmd;
nodular_1.Mod(CMDMod);
//# sourceMappingURL=index.js.map