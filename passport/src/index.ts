import { Nodular, Inject } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';

import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as connect from 'connect-ensure-login';

export module PassportModule {

    export abstract class AuthenticationController {
        @Inject(ServerModule.ServerConfig) protected config: any; // fix!  ServerModule.ServerConfig;        

        /**
         * Passport strategy used to authenticate, authorize user
         */
        abstract strategy: passport.Strategy;                
        /**
         * Authenticate implementation
         * @param passport Main Passport object
         */
        abstract authenticate(passport: passport.PassportStatic): any;        
        /**
         * Serialization method to apply
         * @param user User object to serialize
         * @param done cb passing the id value used in deserialization
         */
        abstract serializeUser(user: any, done: (err: any, id?: any) => void);
        /**
         * Deserialization method to apply
         * @param user User object to deserialize
         * @param done cb passing the user object that was deserialized
         */
        abstract deserializeUser(user: any, done: (err: any, user?: any) => void);         

        onInit() {
            passport.serializeUser(this.serializeUser);
            passport.deserializeUser(this.deserializeUser);
            passport.use(this.strategy);
            this.config.bind((app) => {
                app.use(cookieParser());                
                app.use(passport.initialize());
                app.use(passport.session());                
            });
        }

        protected protect(handles: Array<(req: any, res: any, next?: any) => void>): any[] {
            var handlers = [];
            handlers.push(connect.ensureLoggedIn());
            
            handles.forEach((v) => handlers.push(v));
            return handlers;
        }

        @Get('/auth/:provider') auth = this.authenticate(passport);
    }

}