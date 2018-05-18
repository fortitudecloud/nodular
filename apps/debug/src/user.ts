import { Nodular } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import { PassportModule } from 'nodular-passport';

import * as passport from 'passport';
import * as session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import * as JsonDB from 'node-json-db';
import * as path from 'path';

export module UserModule {

    @HttpController()
    export class UserController extends PassportModule.AuthenticationController {        
        
        strategy: passport.Strategy = new LocalStrategy((username, password, done) => {
            var _u = this.db.getData('/' + username);
            if(_u) done(null, _u);
            else done(null, false);
        });

        db: any;
        
        onInit() {
            // use express session storage

            this.config.bind((app) => {
                app.use(session({ 
                    secret: 'cookie_secret',
                    name:   'kaas',
                    resave: false,
                    saveUninitialized: true
                }));
            });

            // get JsonDB reference
            var filename = path.resolve(__dirname, 'db.json');
            console.log(filename);
            this.db = new JsonDB(filename, true, true);

            super.onInit();
        }

        authenticate(passport: any) {
            return passport.authenticate('local', { 
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });
        }
        
        //abstract serialize: () =>  (user: any, done: (err: any, id?: any) => void) => void;
        serialize = () => {
            return (user: any, done: (err: any, id?: any) => void) => {
                done(null, user.username);    
            }
        }

        //deserialize: () => (id: any, done: (err: any, user?: any) => void) => void;
        deserialize = () => {
            var getUser = (username: string) => {
                return this.db.getData('/' + username);
            }
            return (id: any, done: (err: any, user?: any) => void) => {
                var _u = getUser(id);
                done(null, _u);    
            }
        }

        // serializeUser(user: any, done: (err: any, id?: any) => void) {
        //     done(null, user.username);
        // }
        
        // deserializeUser(user: any, done: (err: any, user?: any) => void) {
        //     var _u = this.db.getData('/' + user);
        //     done(null, _u);
        // }
        
    }

}