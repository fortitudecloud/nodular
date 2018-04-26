import 'reflect-metadata';
import { ServerModule } from './index';

/** socket On */
export function On(event: string) {    
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, [ServerModule.decorators.SOCKET_ON, event], target);
    }
}

/**
 * socketController
 */
export function SocketController() {
    return function (target: Function) {
        Reflect.defineMetadata(ServerModule.decorators.SOCKET_CONTROLLER, {}, target);
    }
}

/**
 * Gets the event binding for func
 * @param controller 
 * @param action 
 */
export function GetEventSignal(controller: any, action: string): { binder: string, event: string } {
    var meta = Reflect.getMetadata(action, controller);
    if(!meta) return <any>{};
    return { binder: meta[0], event: meta[1] };
}