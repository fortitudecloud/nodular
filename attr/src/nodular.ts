import 'reflect-metadata';
import decorators from './decorators';

export const nodularModules = [];

/**
 * 
 * @param options 
 */
export function Nodular(modules: Array<any>) {     
    modules.forEach(m => nodularModules.push(m));
    
    // if(nodularModules.length > 1) console.log(nodularModules);

    console.log(nodularModules);
    
    return function(target: Function) {
        modules.forEach(v => Reflect.defineMetadata(decorators.nodular, v, target));
    }    
}