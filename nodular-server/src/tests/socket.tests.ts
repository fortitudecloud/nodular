import { Nodular, Inject } from 'nodular';
import { ServerModule, HttpController, Get, SocketController, On } from '../index';
import { SocketModule } from '../socket.controller';
import { HttpModule } from '../http.controller';
import { resolve } from 'path';

export module EventModule {
    @SocketController()
    export class AnimalController {
        @Inject(SocketModule.SocketEmitter) emitter: SocketModule.SocketEmitter;

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

    @HttpController()
    export class ChatController {
        @Get('/') home = (req, res) => {            
            var path = resolve(__dirname + '/chat.html');
            res.sendFile(path);
        };

        @Get('/socket.io.client') client = (req, res) => {
            var path = resolve(__dirname + '/socket.io.js');
            res.sendFile(path);
        };
    }

}

@Nodular([ServerModule, HttpModule, SocketModule, EventModule])
class Start { }