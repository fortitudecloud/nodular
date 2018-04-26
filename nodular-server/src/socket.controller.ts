import 'reflect-metadata';
import { Injectable, Inject, Loader, NodularContainer } from 'nodular';
import { Socket, Server } from 'socket.io';
import { ServerModule } from './index';
import { GetEventSignal } from './socket.decorators';

export module SocketModule {

    interface IPayload {
        payload: {};
        scope: string;
    }

    interface IActionContext {
        controller: any;   
        event: string;     
        action: any;
    }

    interface IControllerConstructor {
        (controller: SocketController): any[];
    }

    @Injectable({ factory: true })
    export class ControllerFactory {
        constructor(controller: any) {
            return [controller];
        }
    }

    @Injectable()
    export class SocketController {
        static server: Server;

        @Inject(ControllerFactory) controllerFactory: IControllerConstructor;        

        public create(server: Server) {
            if(!SocketController.server) SocketController.server = server;
            
            var _server = server;
            
            //log
            console.log("[SocketController::create] Mounting socket controllers.");
            
            var loader: Loader = NodularContainer.context.getLoader();
            var _this = this;
            
            var bindEvent = (controller: any, setter: (context: IActionContext) => void) => {
                var inst = _this.controllerFactory(controller)[0];                
                for(var func in inst) {
                    var meta = GetEventSignal(inst, func);
                    if(meta && meta.binder == ServerModule.decorators.SOCKET_ON) setter({ controller: controller, event: meta.event, action: func });                        
                }
            }            

            // get Controllers
            loader.invoke(ServerModule.decorators.SOCKET_CONTROLLER, (controller) => {
                // event binders      
                var socketCtrl = _this.controllerFactory(controller)[0];                                
                _server.on('connection', (socket) => {                        
                    if(socketCtrl['onConnection']) socketCtrl['onConnection'](socket);
                    bindEvent(controller, (context) => {                 
                        socket.on(context.event, (e) => socketCtrl[context.action](e));
                    });
                });                      
            });
        }
    }

    /**
     * Class used to emit signals to the server
     */
    @Injectable()
    export class SocketEmitter {
        emit(event: string, ...args: any[]): any {
            return SocketController.server.emit(event, ...args);
        }
    }

}