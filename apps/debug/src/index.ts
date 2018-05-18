import { Nodular } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import { PassportModule } from 'nodular-passport';
import { UserModule } from './user';

import * as connect from 'connect-ensure-login';

module DebugModule {
    @HttpController()
    export class DebugHttp {

        private protect = PassportModule.protect;

        @Get('/') home = this.protect([(req, res) => {
                res.send('Hoggie rises');
            }])            

        @Get('/login') login = (req, res) => {
            res.send('Not authenticated. Hit the login route with username and password');
        }
    }
}

@Nodular([ServerModule, HttpModule, HttpController, PassportModule, UserModule, DebugModule])
class Start {}