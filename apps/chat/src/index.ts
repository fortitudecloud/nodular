import { Nodular } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';

module ChatModule {
    @HttpController()
    export class ChatHttp {
        @Get('/') home = (req, res) => {
            res.send('Dogman');
        }
    }
}

@Nodular([ServerModule, HttpModule, HttpController, ChatModule])
class Start {}