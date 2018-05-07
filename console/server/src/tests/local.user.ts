import { Nodular, Injectable, InjectableOptions } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import { UserModule } from '../index';
import { Strategy as LocalStrategy } from 'passport-local';
import * as JsonDB from 'node-json-db';

module LocalModule {
    @Injectable({
        bind: () => "AUTH",
        singleton: true    
    })
    export class LocalAuth implements UserModule.IPassportStrategy {
        name: string = 'local';
        db: JsonDB;

        constructor() {
            this.db = new JsonDB('users', true, false);
        }
        getStrategy() {
            return new LocalStrategy((username, password, done) => {
                var user = this.db.getData('/' + username);
                if(!user) return done(null, false);
                else return done(null, user);
            });              
        }
    }    

    @HttpController() 
    export class AppController {
        @Get('/') home = (req, res) => {
            res.send('<a href="/auth/local">Login</a>')
        }

        @Get('/auth/local/success') success = (req, res) => {
            res.send('Success!')
        }

        @Get('/login') fail = (req, res) => {
            res.send('<p>Failed Auth</p><a href="/auth/local">Login Again</a>')
        }
    }
}