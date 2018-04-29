"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorators_1 = require("./decorators");
var container_1 = require("./container");
/**
 *
 * @param modules to bootstrap
 */
function Nodular(modules) {
    var loader = new Loader();
    loader.register(modules);
    loader.discover();
    loader.bootstrap();
    return function (target) {
        modules.forEach(function (v) { return Reflect.defineMetadata(decorators_1.default.nodular, v, target); });
    };
}
exports.Nodular = Nodular;
function Entry() {
    return function (target) {
        Reflect.defineMetadata(decorators_1.default.entry, {}, target);
    };
}
exports.Entry = Entry;
function Injectable(options) {
    return function (target) {
        Reflect.defineMetadata(decorators_1.default.injectable, options || {}, target);
    };
}
exports.Injectable = Injectable;
function Inject(symbol) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, symbol, target);
    };
}
exports.Inject = Inject;
var Loader = /** @class */ (function () {
    function Loader(decorators) {
        this.decorated = {};
        this.nodules = [];
        for (var index in decorators) {
            this.decorated[decorators[index]] = [];
        }
    }
    /**
     * bootstraps and runs that main application loop
     */
    Loader.prototype.bootstrap = function () {
        var main = this.decorated[decorators_1.default.entry];
        var container = new container_1.NodularContainer(this);
        container.resolve([main], function (m) {
            if (main && main.length > 0)
                main[0].run(m());
        })();
    };
    /**
     * Registers Nodular modules
     * @param nodules
     */
    Loader.prototype.register = function (nodules) {
        var _this = this;
        nodules.forEach(function (n) { return _this.nodules.push(n); });
    };
    /**
     * Finds all implementations of an object decorated
     * @param decorator
     */
    Loader.prototype.find = function (decorator) {
        var objects = [];
        // check modules (module, class, function, property) for decorators
        this.drill(this.nodules, decorator, function (obj, decorator) {
            objects.push(obj);
        });
        return objects;
    };
    /**
     * finds decorated objects from the grappled app
     */
    Loader.prototype.discover = function () {
        // get decorators for build
        var decs = [];
        decs.push(decorators_1.default.entry);
        decs.push(decorators_1.default.nodular);
        decs.push(decorators_1.default.injectable);
        decs.push(decorators_1.default.inject);
        this.nodules.forEach(function (n) {
            if (n['decorators']) {
                for (var d in n['decorators'])
                    decs.push(d);
            }
        });
        for (var index in decs) {
            this.decorated[decs[index]] = this.find(decs[index]);
        }
    };
    /**
     * passes the decoratored objects
     * @param decorator
     * @param func
     */
    Loader.prototype.invoke = function (decorator, func) {
        for (var obj in this.decorated[decorator]) {
            var meta = Reflect.getMetadata(decorator, this.decorated[decorator][obj]);
            func(this.decorated[decorator][obj], meta);
        }
    };
    Loader.prototype.exists = function (decorator, metaValue) {
        if (!metaValue)
            return this.decorated[decorator].length > 0;
        else {
            var found = false;
            for (var type in this.decorated[decorator]) {
                var meta;
                if (meta = Reflect.getMetadata(decorator, type)) {
                    if (meta == metaValue)
                        found = true;
                }
            }
            return false;
        }
    };
    Loader.prototype.has = function (decorator, obj, meta) {
        var metaData;
        if (metaData = Reflect.getMetadata(decorator, obj)) {
            meta(metaData);
        }
    };
    /**
     * drills into an object to discover decorated objects
     * @param objects
     * @param decorator
     * @param found
     */
    Loader.prototype.drill = function (objects, decorator, found) {
        // self check
        if (this.IsObject(objects)) {
            if (Reflect.getMetadata(decorator, objects)) {
                found(objects, decorator);
            }
            // array check
            for (var obj in objects)
                this.drill(objects[obj], decorator, found);
        }
    };
    Loader.prototype.IsObject = function (x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    };
    return Loader;
}());
exports.Loader = Loader;
//# sourceMappingURL=nodular.js.map