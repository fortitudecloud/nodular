import { Nodular, Injectable, Inject } from 'nodular';
import { HttpController, Get, Post } from 'nodular-server';
import { Observable } from 'rxjs';

export module UserModule {
    @HttpController()
    export class Authentication {
        @Inject("AUTH") authProvider: IAuthenticationProvider;

        @Post('/auth') auth = (req, res) => {
            var user = req.body;            
            res.json(user);
        }
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