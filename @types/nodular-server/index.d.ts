export function Get(route: string): (target: any, propertyKey: string) => void;
export function Post(route: string): (target: any, propertyKey: string) => void;
export function Put(route: string): (target: any, propertyKey: string) => void;
export function Delete(route: string): (target: any, propertyKey: string) => void;
export function Patch(route: string): (target: any, propertyKey: string) => void;
export function HttpController(): (target: Function) => void;

export function On(route: string): (target: any, propertyKey: string) => void;
export function SocketController(): (target: Function) => void;

declare var ServerModule: {}
declare var HttpModule: {}
declare var SocketModule: {}