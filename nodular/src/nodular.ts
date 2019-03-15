import 'reflect-metadata';
import decorators from './decorators';
import { NodularContainer } from './container';

/**
 * 
 * @param modules to bootstrap
 */
export function Nodular(modules: Array<any>) {
    var loader = new Loader();    
    if(staged) staged.forEach(v => modules.push(v));
    loader.register(modules);
    loader.discover();
    loader.bootstrap();

    return function(target: Function) {                
        modules.forEach(v => Reflect.defineMetadata(decorators.nodular, v, target));
    }    
}

var staged: Array<any>;

/**
 * Adds module to the execution context
 * @param mod 
 */
export function Mod(mod) {
    if(!staged) staged = [];
    staged.push(mod);    
}

export function Entry() {
    return function(target: Function) {
        Reflect.defineMetadata(decorators.entry, {}, target);
    }
}

export interface InjectableOptions {
    /**
     * Object composition. Instantiates an object from 
     * a non parameterless constructor
     */
    resolver?: (...a) => any;
    /**
     * Nodular will treat the instance as a singleton
     */
    singleton?: boolean;
    /**
     * Nodular style factory service
     */
    factory?: boolean;
    /**
     * binds the injected service to this object type
     */
    bind?: (runtimeType?: any) => any;
}

export function Injectable(options?: InjectableOptions) {
    return function (target: Function) {
        Reflect.defineMetadata(decorators.injectable, options || {}, target);
    }
}

export function Inject(symbol: any) {    
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, symbol, target);
    }
}

export class Loader {
    private nodules: any[];
    private decorated: { [name: string]: any[] } = {};

    constructor(decorators?: string[]) {
        this.nodules = [];
        for(let index in decorators) {
            this.decorated[decorators[index]] = [];
        }
    }

    /**
     * bootstraps and runs that main application loop
     */
    bootstrap(): void {
        let main = this.decorated[decorators.entry];
        var container = new NodularContainer(this);
        container.resolve([main], (m) => {
            if(main && main.length > 0) main[0].run(m());
        })();        
    }

    /**
     * Registers Nodular modules
     * @param nodules 
     */
    register(nodules: any[]): void {
        nodules.forEach(n => this.nodules.push(n));
    }    

    /**     
     * Finds all implementations of an object decorated
     * @param decorator 
     */
    find(decorator: string): any[] {
        var objects = [];

        // check modules (module, class, function, property) for decorators
        this.drill(this.nodules, decorator, (obj, decorator) => {
            objects.push(obj);
        });

        return objects;
    }

    /**
     * finds decorated objects from the grappled app
     */
    discover(): void {
        // get decorators for build
        var decs = [];
        
        decs.push(decorators.entry);
        decs.push(decorators.nodular);
        decs.push(decorators.injectable);  
        decs.push(decorators.inject);      

        this.nodules.forEach(n => {
            if(n['decorators']) {
                for(var d in n['decorators']) decs.push(d);
            }
        });

        for(let index in decs) {            
            this.decorated[decs[index]] = this.find(decs[index]);
        }
    }

    /**
     * passes the decoratored objects
     * @param decorator
     * @param func 
     */
    invoke(decorator: string, func: (obj: any, meta?: any) => void): void {
        for(let obj in this.decorated[decorator]) {
            var meta = Reflect.getMetadata(decorator, this.decorated[decorator][obj]);            
            func(this.decorated[decorator][obj], meta);
        }
    }

    exists(decorator: string, metaValue?: any): boolean {
        if(!metaValue) return this.decorated[decorator].length > 0;
        else {
            var found = false;
            for(var type in this.decorated[decorator]) {
                var meta;
                if(meta = Reflect.getMetadata(decorator, type)) {
                    if(meta == metaValue) found = true;
                }
            }
            return false;
        }
    }

    has(decorator: string, obj: any, meta?: (data: any) => void): void {
        var metaData;
        if(metaData = Reflect.getMetadata(decorator, obj)) {
            meta(metaData);            
        }
    }

    /**
     * drills into an object to discover decorated objects
     * @param objects 
     * @param decorator 
     * @param found 
     */
    private drill(objects: any, decorator: string, found: (object: any, decorator: string) => void): void {
        // self check
        if(this.IsObject(objects)) {
            if(Reflect.getMetadata(decorator, objects)) {
                found(objects, decorator);
            }

            // array check
            for(let obj in objects) this.drill(objects[obj], decorator, found);
        }        
    }

    private IsObject<T>(x: T | undefined | null | boolean | string | symbol | number): x is T {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
}