import { Nodular, Injectable, Inject } from 'nodular';
import { ServerModule, HttpController, Get, Post } from 'nodular-server';
import { Observable } from 'rxjs';
//import { Strategy, Passport, PassportStatic, Authenticator } from 'passport';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

export module UserModule {
    @HttpController()
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
            passport.authenticate('linkedin');

        @Get('/auth/:provider/return') authReturn = //(req, res) => 
            // [this.passport.authenticate('google'), (req, res) => {
            //     res.redirect('/auth/' + req.params.provider + '/success');
            // }];
            passport.authenticate( 'linkedin', { 
                successRedirect: '/auth/linkedin/success',
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