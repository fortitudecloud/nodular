"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodular_1 = require("../nodular");
var container_1 = require("../container");
var TYPES = {
    Greeting: "Greeting",
    Response: "Response"
};
var service;
var paramless;
var single;
var ContainerTests;
(function (ContainerTests) {
    var Service = /** @class */ (function () {
        function Service(name) {
            this.name = name;
        }
        Service = __decorate([
            nodular_1.Injectable({
                resolver: function () { return { name: 'Hoggy' }; }
            })
        ], Service);
        return Service;
    }());
    ContainerTests.Service = Service;
    var ParameterLess = /** @class */ (function () {
        function ParameterLess() {
        }
        ParameterLess.prototype.hello = function () {
            return 'Hello';
        };
        ParameterLess = __decorate([
            nodular_1.Injectable()
        ], ParameterLess);
        return ParameterLess;
    }());
    ContainerTests.ParameterLess = ParameterLess;
    var Singleton = /** @class */ (function () {
        function Singleton(animal) {
            this.animal = animal;
        }
        Singleton = __decorate([
            nodular_1.Injectable({
                resolver: function () { return { animal: 'Cat' }; },
                singleton: true
            })
        ], Singleton);
        return Singleton;
    }());
    ContainerTests.Singleton = Singleton;
    var ResponseFactory = /** @class */ (function () {
        function ResponseFactory(response) {
            var params = { res: response };
            var Response = /** @class */ (function () {
                function Response(res) {
                    this.res = res;
                }
                Response.prototype.talk = function () { return this.res; };
                Response = __decorate([
                    nodular_1.Injectable({
                        resolver: function () { return params; },
                    })
                ], Response);
                return Response;
            }());
            return [Response];
        }
        ResponseFactory = __decorate([
            nodular_1.Injectable({ factory: true })
        ], ResponseFactory);
        return ResponseFactory;
    }());
    ContainerTests.ResponseFactory = ResponseFactory;
    var Message = /** @class */ (function () {
        function Message() {
        }
        // constructor(             
        //     public animal: string) { }        
        Message.prototype.onInit = function () {
            this.response = this.responseFactory('Woof!')[0];
        };
        Message.prototype.greet = function () {
            return this.greeting.hello() + " " + this.nameService.name + " " + this.animalSingleton.animal + ".\n            " + this.nameService.name + " says \"" + this.response.talk() + "\"";
        };
        __decorate([
            nodular_1.Inject(ParameterLess)
        ], Message.prototype, "greeting", void 0);
        __decorate([
            nodular_1.Inject(Service)
        ], Message.prototype, "nameService", void 0);
        __decorate([
            nodular_1.Inject(Singleton)
        ], Message.prototype, "animalSingleton", void 0);
        __decorate([
            nodular_1.Inject(ResponseFactory)
        ], Message.prototype, "responseFactory", void 0);
        Message = __decorate([
            nodular_1.Injectable({
                bind: function () { return TYPES.Greeting; }
            })
        ], Message);
        return Message;
    }());
    ContainerTests.Message = Message;
    var BinderClass = /** @class */ (function () {
        function BinderClass() {
            this.name = 'Hoggs';
        }
        BinderClass = __decorate([
            nodular_1.Injectable({
                bind: function () { return "BINDERCLASS"; },
                singleton: true
            })
        ], BinderClass);
        return BinderClass;
    }());
    ContainerTests.BinderClass = BinderClass;
    var HasBinder = /** @class */ (function () {
        function HasBinder() {
        }
        HasBinder.prototype.getName = function () {
            return this.bClass.name;
        };
        __decorate([
            nodular_1.Inject("BINDERCLASS")
        ], HasBinder.prototype, "bClass", void 0);
        HasBinder = __decorate([
            nodular_1.Injectable()
        ], HasBinder);
        return HasBinder;
    }());
    ContainerTests.HasBinder = HasBinder;
})(ContainerTests || (ContainerTests = {}));
var loader = new nodular_1.Loader();
loader.register([ContainerTests]);
loader.discover();
var ioc = new container_1.NodularContainer(loader);
ioc.register('service', function (name) {
    return {
        name: 'Hello ' + name
    };
});
// ioc.resolve([ContainerTests.Service], (s) => {
//     service = s('Hoggy');
// })();
// ioc.resolve([ContainerTests.ParameterLess], (p) => paramless = p)();
ioc.resolve(['service'], function (service) {
    console.log(service('Puma').name);
})();
function build(invoker, services) {
    var injects = invoker();
    for (var i in injects)
        ioc.runtimeHash(injects[i]);
    ioc.resolve(injects, function () {
        var s = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            s[_i] = arguments[_i];
        }
        var injectedServices = [];
        for (var ser in s)
            injectedServices.push(s[ser]());
        services(injectedServices);
    })();
}
// ioc.resolve([ContainerTests.ResponseFactory], (f) => {
//     var factory = f('Woof!');
//     console.log(factory);
//     // build(() => f('Woof!'), (response) => {
//     //     console.log(response[0].talk());
//     // });
//     console.log(factory[0].talk());
// })();
ioc.resolve([ContainerTests.Singleton], function (s) { return single = s; })();
single.animal = 'Dog';
// ioc.resolve([ContainerTests.Singleton], (s) => single = s)();
ioc.resolve([TYPES.Greeting], function (m) {
    //console.log(m(paramless.hello(), service.name, single.animal).greet());
    //var res = rf('Woof!');
    console.log(m().greet());
})();
ioc.resolve([ContainerTests.HasBinder], function (b) {
    console.log(b().getName());
})();
// console.log(paramless.hello());
// console.log(service.name);
// console.log(single.animal); 
//# sourceMappingURL=container.tests.js.map