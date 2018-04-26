import { ServerModule, HttpGet } from 'nodular-server';

export module GetModule {
    @HttpGet('/hoggy')
    export class SimpleGet {
        handle(req, res, next) {
            res.send('Hi Hoggy');
        }
    }
}