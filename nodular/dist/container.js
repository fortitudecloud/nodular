"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var NodularContainer = /** @class */ (function () {
    function NodularContainer(nodularLoader) {
        this.hash = {};
        this.singletons = {};
        if (nodularLoader)
            this.nodules = nodularLoader;
        NodularContainer.context = this;
        this.setHash();
    }
    NodularContainer.prototype.setHash = function () {
        var _this = this;
        if (!this.nodules)
            return;
        this.get(decorators_1.default.injectable, function (type, meta) { return _this.setInjectable(type, meta); });
        this.get(decorators_1.default.entry, function (type, meta) { return _this.setInjectable(type, meta); });
    };
    NodularContainer.prototype.setInjectable = function (type, meta) {
        if (meta.singleton)
            this.singletons[type] = meta.resolver ? meta.resolver() : new type();
        if (meta.factory)
            this.singletons[type] = type;
        this.register(meta.bind ? meta.bind() : type, 
        //(meta.singleton || meta.factory)
        meta.singleton
            ? this.singletons[type]
            : meta.factory
                ? this.wrapFactory(type)
                : this.instantiate(type, meta));
    };
    /**
     * gets types for decorator
     * @param decorator
     * @param iterator
     */
    NodularContainer.prototype.get = function (decorator, iterator) {
        this.nodules.invoke(decorator, function (type, meta) { return iterator(type, meta); });
    };
    NodularContainer.prototype.instantiate = function (type, meta) {
        var _this = this;
        var p;
        if (meta.resolver)
            p = meta.resolver();
        var args = [];
        for (var a in p)
            args.push(p[a]);
        return function () {
            var instance = Reflect.construct(type, args);
            var keys = Reflect.getMetadataKeys(instance);
            for (var prop in keys) {
                var service = Reflect.getMetadata(keys[prop], instance);
                try {
                    var serviceMeta = Reflect.getMetadata(decorators_1.default.injectable, service);
                    _this.resolve([service], function (value) { return instance[keys[prop]] =
                        (serviceMeta.singleton || serviceMeta.factory) ? value : value(); })();
                }
                catch (e) { }
            }
            if (instance.onInit)
                instance.onInit();
            return instance;
        };
    };
    NodularContainer.prototype.wrapFactory = function (type) {
        var _this = this;
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            var injects = (_a = _this.singletons)[type].apply(_a, a);
            for (var i in injects)
                _this.runtimeHash(injects[i]);
            var injectedServices = [];
            _this.resolve(injects, function () {
                var s = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    s[_i] = arguments[_i];
                }
                for (var ser in s)
                    injectedServices.push(s[ser]());
            })();
            return (injectedServices);
            var _a;
        };
    };
    NodularContainer.prototype.runtimeHash = function (type) {
        var meta = Reflect.getMetadata(decorators_1.default.injectable, type);
        this.setInjectable(type, meta || {});
    };
    NodularContainer.prototype.register = function (key, value, singleton) {
        this.hash[key] = value;
        if (singleton)
            this.singletons[key];
    };
    NodularContainer.prototype.resolve = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var args = [], deps = arguments[0], func = arguments[1], scope = arguments[2] || {};
        var _hash = this.hash;
        return function () {
            var a = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < deps.length; i++) {
                var d = deps[i];
                args.push(_hash[d] && d != '' ? _hash[d] : a.shift());
            }
            args = args.concat(a);
            return func.apply(scope || {}, args);
        };
    };
    NodularContainer.prototype.getLoader = function () {
        return this.nodules;
    };
    return NodularContainer;
}());
exports.NodularContainer = NodularContainer;
//# sourceMappingURL=container.js.map