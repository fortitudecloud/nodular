import { Nodular, Injectable, InjectableOptions } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import { UserModule } from '../index';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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
                clientID:     GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                //NOTE :
                //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
                //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/ 
                //then edit your /etc/hosts local file to point on your private IP. 
                //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
                //if you use it.
                callbackURL: "http://localhost:3000/auth/google/return",
                passReqToCallback   : true
              },
              function(request, accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
                  
                  // To keep the example simple, the user's Google profile is returned to
                  // represent the logged-in user.  In a typical application, you would want
                  // to associate the Google account with a user record in your database,
                  // and return that user instead.
                  return done(null, profile);
                });
              }
            );
        }
    }    

    @HttpController() 
    export class AppController {
        @Get('/') home = (req, res) => {
            res.send('<a href="/auth/google">Login</a>')
        }

        @Get('/auth/google/success') success = (req, res) => {
            res.send('Success!')
        }

        @Get('/login') fail = (req, res) => {
            res.send('<p>Failed Auth</p><a href="/auth/google">Login Again</a>')
        }
    }

}

@Nodular([ServerModule, HttpModule, UserModule, GoogleModule])
class Start {}