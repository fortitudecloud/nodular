var Container = /** @class */ (function () {
    function Container() {
        this.hash = {};
    }
    Container.prototype.register = function (key, value) {
        this.hash[key] = value;
    };
    Container.prototype.resolve = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var args = [], deps = arguments[0], func = arguments[1], scope = arguments[2] || {};
        var hash = this.hash;
        return function () {
            var a = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < deps.length; i++) {
                var d = deps[i];
                args.push(hash[d] && d != '' ? hash[d] : a.shift());
            }
            args = args.concat(a);
            return func.apply(scope || {}, args);
        };
    };
    return Container;
}());
var Service = /** @class */ (function () {
    function Service(name) {
        this.name = name;
    }
    return Service;
}());
var ioc = new Container();
ioc.register(Service, function (name) {
    return new Service(name);
});
var service = ioc.resolve([Service], function (s) {
    console.log(s('Hoggy').name);
});
service();
//# sourceMappingURL=container.js.map