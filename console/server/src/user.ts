import { Nodular, Injectable, Inject } from 'nodular';
import { ServerModule, HttpController, Get, Post } from 'nodular-server';
import { Observable } from 'rxjs';
//import { Strategy, Passport, PassportStatic, Authenticator } from 'passport';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

export module UserModule {

    export abstract class AuthenticationController {
        @Inject(ServerModule.ServerConfig) private config: any; // fix!  ServerModule.ServerConfig;        

        abstract strategy: passport.Strategy;        
        abstract session: any;
        abstract authenticate(passport: passport.PassportStatic): any;
        //abstract authenticate(func: (strategy: string | string[], options: passport.AuthenticateOptions, callback?: (...args: any[]) => any) => any);
        abstract serializeUser(user: any, done: (err: any, id?: any) => void);
        abstract deserializeUser(user: any, done: (err: any, user?: any) => void);         

        onInit() {
            passport.serializeUser(this.serializeUser);
            passport.deserializeUser(this.deserializeUser);
            passport.use(this.strategy);
            this.config.bind((app) => {
                app.use( cookieParser());
                app.use( this.session);
                app.use(passport.initialize());
                app.use(passport.session());
            });
        }

        @Get('/auth/:provider') auth = this.authenticate(passport);
    }

    //@HttpController()
    export class Authentication {
        @Inject(ServerModule.ServerConfig) private config: any; // fix!  ServerModule.ServerConfig;
        @Inject("AUTH") authStrategy: IPassportStrategy;

        public passport: any;

        onInit() {  
            // TODO: replace all below with implementers service code
            passport.serializeUser(function(user, done) {
                done(null, user);
            });
            
            passport.deserializeUser(function(obj, done) {
                done(null, obj);
            });
            
            passport.use(this.authStrategy.getStrategy());            

            this.config.bind((app) => {
                app.use( cookieParser());
                app.use( session({ 
                    secret: 'cookie_secret',
                    name:   'kaas',
                    resave: false,
                    saveUninitialized: true
                }));
                app.use(passport.initialize());
                app.use(passport.session());
            });

            //this.passport = passport;
        }

        @Get('/auth/:provider') auth = //(req, res) =>            
            // (req, res, next) => { 
            //     console.log(this.authStrategy.name);
            //     passport.authenticate(this.authStrategy.name)(req, res, next) 
            // }
            //passport.authenticate('local');
            passport.authenticate( 'local', { 
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });

        @Get('/auth/:provider/return') authReturn = //(req, res) => 
            // [this.passport.authenticate('google'), (req, res) => {
            //     res.redirect('/auth/' + req.params.provider + '/success');
            // }];            
            passport.authenticate( 'local', { 
                successRedirect: '/auth/' + 'local' + '/success',
                failureRedirect: '/login'
            });
    }

    export interface IPassportStrategy {
        name: string;
        getStrategy(): passport.Strategy;
    }

    /**
     * Custom authentication provider orchestrated on the server side
     */
    export interface IAuthenticationProvider {
        /**
         * Returns an observable object containing
         */
        authenticate(authModel: any): Observable<IAuthenticationResponse>;
    }

    export interface IAuthenticationResponse {
        status: number;
        data: any;
        error: any;
    }
}