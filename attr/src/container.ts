class Container {
    hash = {};

    constructor() {        
    }

    register(key, value) {
        this.hash[key] = value;
    }

    resolve(...a) {
        var args = [],
        deps = arguments[0],
        func = arguments[1],
        scope = arguments[2] || {};
        var hash = this.hash;
        return function () {
            var a = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < deps.length; i++) {
                var d = deps[i];
                args.push(hash[d] && d != '' ? hash[d] : a.shift());
            }
            args = args.concat(a);
            return func.apply(scope || {}, args);
        }
    }
}

class Service {
    constructor(public name: string) {}
}

var ioc = new Container();
ioc.register(Service, (name) => {
    return new Service(name);
});

var service = ioc.resolve([Service], (s) => {
    console.log(s('Hoggy').name);
});

service();




