import { resolve } from 'path';
import { ServerModule, HttpController, Get } from 'nodular-server';

export module ShellModule {
    @HttpController()
    export class Client {
        @Get('/') home = (req, res) => {
            var path = resolve(__dirname + '/home.html');
            res.sendFile(path);
        }
    }
}