import { Nodular, Inject, NodularContainer } from 'nodular';
import { ServerModule, HttpController, Get, SocketController, On } from '../index';
import { SocketModule } from '../socket.controller';

export module ControllerModule {
    @SocketController()
    export class AnimalController {
        @Inject(SocketModule.SocketEmitter) private emitter: SocketModule.SocketEmitter;

        onConnection = (socket) => {
            console.log('a user connected');
            socket.broadcast.emit('hi');
        };

        @On('chat') public chat = (msg) => {
            this.emitter.emit('chat', msg);
        };
        
        @On('chat message') public chatMessage = (msg) => {
            this.emitter.emit('chat message', msg);            
        };
    }
}

@Nodular([ServerModule, SocketModule, ControllerModule])
class Start { }

var controllerFactory = NodularContainer.context.resolve([SocketModule.ControllerFactory], function(factory) {
    console.log(factory);
    var inst = factory(ControllerModule.AnimalController);
    console.log(inst);
});

controllerFactory();
