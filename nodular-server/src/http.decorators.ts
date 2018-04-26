import 'reflect-metadata';
import { ServerModule } from './index';

/** http Get */
export function Get(route: string) {    
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, [ServerModule.decorators.HTTP_GET, route], target);
    }
}

/** http Post */
export function Post(route: string) {    
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, [ServerModule.decorators.HTTP_POST, route], target);
    }
}

/** http Put */
export function Put(route: string) {    
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, [ServerModule.decorators.HTTP_PUT, route], target);
    }
}

/** http Delete */
export function Delete(route: string) {    
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, [ServerModule.decorators.HTTP_DELETE, route], target);
    }
}

/** http Patch */
export function Patch(route: string) {    
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, [ServerModule.decorators.HTTP_PATCH, route], target);
    }
}

/** http Base path */
export function HttpController() {
    return function (target: Function) {
        Reflect.defineMetadata(ServerModule.decorators.HTTP_CONTROLLER, {}, target);
    }
}

/**
 * Fetch the controller action metadata for servicing web requests
 * @param controller 
 * @param action 
 */
export function GetVerbRoute(controller: any, action: string): { verb: string, route: string } {
    var meta = Reflect.getMetadata(action, controller);
    if(!meta) return <any>{};
    return { verb: meta[0], route: meta[1] };
}