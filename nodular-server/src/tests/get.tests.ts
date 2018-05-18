import { Nodular } from 'nodular';
import { ServerModule, HttpController, Get } from '../index';
import { HttpModule } from '../http.controller';

export module GetModule {
    @HttpController()
    export class AnimalController {
        @Get('/hoggy') public dog = (req, res) => {
            res.send('The dogs name is Hoggy!');
        };

        @Get('/puma') public puma = (req, res) => {
            res.send('The cats name is Puma!');
        };

        @Get('/middle') middle = [(req, res, next) => {
            req.msg = 'Middleware message';
            next();
        }, (req, res) => {
            res.send(req.msg);
        }];
    }
}

@Nodular([ServerModule, HttpModule, GetModule])
class Start { }