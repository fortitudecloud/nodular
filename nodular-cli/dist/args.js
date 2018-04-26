"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Arguments = /** @class */ (function () {
    function Arguments(args) {
        this.args = args;
    }
    /** arguments contain this switch */
    Arguments.prototype.has = function (arg) {
        if (this.args.find(function (a) { return a == (arg); }))
            return true;
        else
            return false;
    };
    /** gets the value for this switch */
    Arguments.prototype.get = function (arg) {
        var _this = this;
        var value;
        this.args.filter(function (v, e) {
            if (v == (arg) && e !== (_this.args.length - 1)) {
                value = _this.args[e + 1];
            }
        });
        return value;
    };
    return Arguments;
}());
exports.Arguments = Arguments;
//# sourceMappingURL=args.js.map