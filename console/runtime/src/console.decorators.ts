import "reflect-metadata";
import { ConsoleModule } from './index';

export function ConsoleApp() {
    return function (target: Function) {
        Reflect.defineMetadata(ConsoleModule.decorators.APP, {}, target);
    }
}
