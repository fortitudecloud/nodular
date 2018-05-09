import { Nodular } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from '../index';

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