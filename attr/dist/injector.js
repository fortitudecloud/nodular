var dependencies = function () {
    var hash = {};
    function register(key, value) {
        hash[key] = value;
    }
    ;
    function resolve() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var args = [], deps = arguments[0], func = arguments[1], scope = arguments[2] || {};
        return function () {
            var a = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < deps.length; i++) {
                var d = deps[i];
                args.push(hash[d] && d != '' ? hash[d] : a.shift());
            }
            args = args.concat(a);
            return func.apply(scope || {}, args);
        };
    }
    ;
    return {
        register: register,
        resolve: resolve
    };
}();
dependencies.register('router', dependencies.resolve(['service'], function (service, name) {
    return {
        name: 'Function router: ' + service('c').name + ' - ' + name
    };
}));
dependencies.register('service', function (name) {
    return {
        name: 'Function service: ' + name
    };
});
var doSomething = dependencies.resolve(['router', , 'service'], function (router, b, service) {
    console.log(router('a').name);
    console.log(b);
    console.log(service('b').name);
});
doSomething("Other");
//# sourceMappingURL=injector.js.map