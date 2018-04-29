import { Nodular, Injectable, Inject } from 'nodular';
import { ServerModule, HttpController, Get, Post } from 'nodular-server';
import { Observable } from 'rxjs';
import { Strategy, Passport, PassportStatic, Authenticator } from 'passport';

export module UserModule {
    @HttpController()
    export class Authentication {
        @Inject(ServerModule.ServerConfig) private config: any; // fix!  ServerModule.ServerConfig;
        @Inject("AUTH") authStrategy: Strategy;

        private passport: any;

        onInit() {
            var passport = new Passport();
            passport.use(this.authStrategy);

            // todo: replace these with a service from the implementer
            passport.serializeUser(function(user, cb) {
                cb(null, user);
            });
            
            passport.deserializeUser(function(obj, cb) {
                cb(null, obj);
            });

            this.config.bind((app) => {
                // todo: replace this with a session service from the implementer
                app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

                app.use(passport.initialize());
                app.use(passport.session());
            });

            this.passport = passport;
        }

        @Get('/auth/:provider') auth = (req, res) => 
            this.passport.authenticate(req.params.provider);

        @Get('/auth/:provider/return') authReturn = (req, res) => 
            [this.passport.authenticate(req.params.provider), (req, res) => {
                res.redirect('/');
            }];
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