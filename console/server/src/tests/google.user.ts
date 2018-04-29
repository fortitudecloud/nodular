import { Nodular, Injectable, InjectableOptions } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import { UserModule } from '../index';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

module GoogleModule {
    const GOOGLE_CLIENT_ID = '1090226470090-rp4kusnm3tls79oeb3pt2emnmf7u4pdh.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET = '3AymfnvIBGe71wimkfChQxO1';

    @Injectable({
        // resolver: () => new GoogleStrategy({
        //                 clientID: GOOGLE_CLIENT_ID,
        //                 clientSecret: GOOGLE_CLIENT_SECRET,
        //                 callbackURL: "http://localhost:3000/auth/google/return"
        //               },
        //               function(accessToken, refreshToken, profile, cb) {
        //                 // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //                 //   return cb(err, user);
        //                 // });
        //                 return cb(null, profile);
        //               }),
        bind: () => "AUTH",
        singleton: true
        //factory: true
    })
    export class GoogleAuth implements UserModule.IPassportStrategy {
        name: string = 'google';
        constructor() {
        }
        getStrategy() {
            return new GoogleStrategy({
                                clientID: GOOGLE_CLIENT_ID,
                                clientSecret: GOOGLE_CLIENT_SECRET,
                                callbackURL: "http://localhost:3000/auth/google/return"
                              },
                              function(accessToken, refreshToken, profile, cb) {
                                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                                //   return cb(err, user);
                                // });
                                return cb(null, profile);
                              });
        }
    }
    // export class GoogleAuth extends GoogleStrategy {
    //     constructor() {
    //         super({
    //             clientID: GOOGLE_CLIENT_ID,
    //             clientSecret: GOOGLE_CLIENT_SECRET,
    //             callbackURL: "http://localhost:3000/auth/google/return"
    //           },
    //           function(accessToken, refreshToken, profile, cb) {
    //             // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //             //   return cb(err, user);
    //             // });
    //             return cb(null, profile);
    //           });
    //     }
    // }

    @HttpController() 
    export class AppController {
        @Get('/') home = (req, res) => {
            res.send('<a href="/auth/google">Login</a>')
        }

        @Get('/auth/google/success') success = (req, res) => {
            res.send('Success!')
        }
    }

}

@Nodular([ServerModule, HttpModule, UserModule, GoogleModule])
class Start {}