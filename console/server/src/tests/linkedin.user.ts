import { Nodular, Injectable, InjectableOptions } from 'nodular';
import { ServerModule, HttpModule, HttpController, Get } from 'nodular-server';
import { UserModule } from '../index';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

module LinkedInModule {    
    const LINKEDIN_KEY = '86ipy93pcttzkg';
    const LINKEDIN_SECRET = 'SnoUutEAgrpuHQUv';

    @Injectable({
        bind: () => "AUTH",
        singleton: true    
    })
    export class LinkedInAuth implements UserModule.IPassportStrategy {
        name: string = 'linkedin';
        constructor() {
        }
        getStrategy() {
            return new LinkedInStrategy({
                clientID: LINKEDIN_KEY,
                clientSecret: LINKEDIN_SECRET,
                callbackURL: "http://localhost:3000/auth/linkedin/return",
                scope: ['r_emailaddress', 'r_basicprofile'],
                state: true
              }, function(accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
                  // To keep the example simple, the user's LinkedIn profile is returned to
                  // represent the logged-in user. In a typical application, you would want
                  // to associate the LinkedIn account with a user record in your database,
                  // and return that user instead.
                  return done(null, profile);
                });
            });              
        }
    }    

    @HttpController() 
    export class AppController {
        @Get('/') home = (req, res) => {
            res.send('<a href="/auth/linkedin">Login</a>')
        }

        @Get('/auth/linkedin/success') success = (req, res) => {
            res.send('Success!')
        }

        @Get('/login') fail = (req, res) => {
            res.send('<p>Failed Auth</p><a href="/auth/linkedin">Login Again</a>')
        }
    }

}

@Nodular([ServerModule, HttpModule, UserModule, LinkedInModule])
class Start {}