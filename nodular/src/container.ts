import { Loader, Injectable, InjectableOptions } from './nodular';
import decorators from './decorators';

export class NodularContainer {
    private nodules: Loader;
    private hash = {};
    private singletons = {};

    static context: NodularContainer;

    constructor(nodularLoader: Loader) {
        if(nodularLoader) this.nodules = nodularLoader;
        NodularContainer.context = this;
        this.setHash();
    }

    private setHash() {
        if(!this.nodules) return;
        this.get(decorators.injectable, (type, meta) => this.setInjectable(type, meta));
        this.get(decorators.entry, (type, meta) => this.setInjectable(type, meta));                
    }

    private setInjectable(type, meta: InjectableOptions) { 
        if(meta.singleton) this.singletons[type] = meta.resolver ? meta.resolver() : new type();
        if(meta.factory) this.singletons[type] = type;
        this.register(meta.bind ? meta.bind() : type, 
            //(meta.singleton || meta.factory)
            meta.singleton
                ? this.singletons[type]                                    
                : meta.factory
                    ? this.wrapFactory(type)
                    : this.instantiate(type, meta));
    }

    /**
     * gets types for decorator
     * @param decorator 
     * @param iterator 
     */
    private get(decorator, iterator: (type, meta?) => void): void {
        this.nodules.invoke(decorator, (type, meta?) => iterator(type, meta));
    }
    
    private instantiate(type: any, meta: InjectableOptions): () => any {
        var p;
        if(meta.resolver) p = meta.resolver();

        var args = [];
        for(var a in p) args.push(p[a]);

        return () => {
            var instance: any = Reflect.construct(type, args);
            var keys = Reflect.getMetadataKeys(instance);
            for(var prop in keys) {   
                var service = Reflect.getMetadata(keys[prop], instance);
                try {
                    if(typeof service === "string") {
                        this.resolve([service],
                            (value) => {
                                var s = typeof value === "object" ? value : value();
                                var serviceMeta = Reflect.getMetadata(decorators.injectable, s.__proto__.constructor);
                                this.resolve([service], 
                                    (value) => instance[keys[prop]] = 
                                        (serviceMeta.singleton || serviceMeta.factory) ? value : value())();        
                            })();
                    } else {
                        var serviceMeta = Reflect.getMetadata(decorators.injectable, service);
                        this.resolve([service], 
                            (value) => instance[keys[prop]] = 
                                (serviceMeta.singleton || serviceMeta.factory) ? value : value())();                
                    }                    
                } catch (e) {}
            }
            if(instance.onInit) instance.onInit();
            return instance;
        };        
    }   

    private wrapFactory(type): (...a) => any {
        return (...a): any => {            
            var injects = this.singletons[type](...a);
            for(var i in injects) this.runtimeHash(injects[i]);
            var injectedServices = [];
            this.resolve(injects, (...s) => {                
                for(var ser in s) injectedServices.push((<any>s[ser])());                             
            })();
            return (injectedServices);
        };
    }
    
    runtimeHash(type) {
        var meta = Reflect.getMetadata(decorators.injectable, type);
        this.setInjectable(type, meta || {});
    }

    register(key, value, singleton?: boolean) {
        this.hash[key] = value;
        if(singleton) this.singletons[key];
    }

    resolve(...a) {
        var args = [],
        deps = arguments[0],
        func = arguments[1],
        scope = arguments[2] || {};
        var _hash = this.hash;        
        return function () {
            var a = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < deps.length; i++) {
                var d = deps[i];
                args.push(_hash[d] && d != '' ? _hash[d] : a.shift());
            }
            args = args.concat(a);
            return func.apply(scope || {}, args);
        }
    }

    getLoader(): Loader {
        return this.nodules;
    }
    
}