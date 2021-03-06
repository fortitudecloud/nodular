import { Nodular } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from '../index';
//import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';

module DebugModule {
    @HttpController()
    export class DebugHttp {
        @Get('/') home = (req, res) => {
            res.send('Default App');
        }
    }
}

@Nodular([ServerModule, HttpModule, HttpController, DebugModule])
class Start {}