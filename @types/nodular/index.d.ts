/**
 * Bootstraps the nodular app
 * @param modules to bootstrap
 */
export function Nodular(modules: Array<any>): (target: Function) => void;
/**
 * Declares the entry point for the app (root-composition)
 */
export function Entry(): (target: Function) => void;
/**
 * Declares a type as an injectable service class 
 * @param options 
 */
export function Injectable(options?: InjectableOptions): (target: Function) => void;
/**
 * Injects a service into this instance
 * @param symbol to bind on for injection
 */
export function Inject(symbol: any): (target: any, propertyKey: string) => void;
/**
 * Injectable type meta signature
 */
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
/**
 * Root application scope discovery and bootstraping
 */
export interface Loader {
    /**
     * explicitly registers modules for service resolution
     * @param nodules >= ES5 module/namespace type
     */
    register(nodules: any[]): void;
    /**
     * Assess modules collected
     */
    discover(): void;
    /**
     * Locates injected service types
     * @param decorator 
     * @param func 
     */
    invoke(decorator: string, func: (obj: any, meta?: any) => void): void;
}
export class NodularContainer implements NodularContainerInterface {
    runtimeHash(type: any): void;
    register(key: any, value: any, singleton?: boolean): void;
    resolve(...a: any[]): () => void;
    getLoader(): Loader;
    static context: NodularContainer
}
export interface NodularContainerInterface {    
    /**
     * Register service at runtime
     * @param type 
     */
    runtimeHash(type): void;
    /**
     * Register service with container
     * @param key 
     * @param value 
     * @param singleton 
     */
    register(key, value, singleton?: boolean): void;
    /**
     * Instantiates new instances of services passed
     * @param a argument list. eg. resolve([Service1, 'service2'], (service1, service2) => void)
     */
    resolve(...a): () => void;
    /**
     * Active Loader
     */
    getLoader(): Loader;
}

/**
 * @Planned => Instance root composition
 * ! Not yet implemented
 */
export interface IEntry {
    new ();
}

/**
 * Registers a mod 
 * @param mod 
 */
export function Mod(mod: any);

