import { Nodular } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';

module DebugModule {
    @HttpController()
    export class DebugHttp {
        @Get('/') home = (req, res) => {
            res.send('Dogman');
        }
    }
}

@Nodular([ServerModule, HttpModule, HttpController, DebugModule])
class Start {}