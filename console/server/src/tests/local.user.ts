import { Nodular, Injectable, InjectableOptions } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import { UserModule } from '../index';
import * as passport from 'passport';
import * as session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import * as JsonDB from 'node-json-db';

module LocalModule {
    
    @HttpController()
    export class LocalAuth extends UserModule.AuthenticationController {
        strategy: passport.Strategy = new LocalStrategy((username, password, done) => {
            var user = {
                id: "1",
                username: "lhickey",
                name: "Lionel Hickey"
            };
            if(user.username == username && password == "password") done(null, user);
            else done(null, false);
        });

        session: any = session({ 
            secret: 'cookie_secret',
            name:   'kaas',
            resave: false,
            saveUninitialized: true
        });

        authenticate(passport: passport.PassportStatic): any {
            return passport.authenticate('local', { 
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });
        }

        serializeUser(user: any, done: (err: any, id?: any) => void) {
            done(null, user);
        }

        deserializeUser(user: any, done: (err: any, user?: any) => void) {
            done(null, user);
        }

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

@Nodular([ServerModule, HttpModule, UserModule, LocalModule])
class Start {}