import * as passport from 'passport';
export declare module PassportModule {
    abstract class AuthenticationController {
        protected config: any;
        /**
         * Passport strategy used to authenticate, authorize user
         */
        abstract strategy: passport.Strategy;
        /**
         * Authenticate implementation
         * @param passport Main Passport object
         */
        abstract authenticate(passport: passport.PassportStatic): any;
        /**
         * Serialization method to apply
         * @param user User object to serialize
         * @param done cb passing the id value used in deserialization
         */
        /**
         * Deserialization method to apply
         * @param user User object to deserialize
         * @param done cb passing the user object that was deserialized
         */
        abstract serialize: () => (user: any, done: (err: any, id?: any) => void) => void;
        abstract deserialize: () => (id: any, done: (err: any, user?: any) => void) => void;
        onInit(): void;
        auth: any;
    }
    function protect(handles: Array<(req: any, res: any, next?: any) => void>): any[];
}
