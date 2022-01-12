import { Entry, Inject, Injectable } from 'nodular';
import * as bodyParser from "body-parser";
import * as express from "express";
import * as io from 'socket.io';
import * as fileUpload from 'express-fileupload';
import { Observable, Subject } from 'rxjs';
import { HttpModule } from './http.controller';
import { SocketModule } from './socket.controller';

var httpServer;

export module ServerModule {    

    @Injectable({        
        singleton: true
    })
    export class ServerConfig {
        private binders: any[] = [];
        private aRef: express.Application;

        bind(func: (app: express.Application) => void): void {
            this.binders.push(func);
            // if already bound
            if(this.aRef) func(this.aRef);
        }

        bindConfigs(a: express.Application) {
            if(!this.aRef) this.aRef = a;
            this.binders.forEach(e => e(a));
        }
    }

    @Entry()
    export class Server {
        //private container: NodularContainer;
        public app: express.Application;
        public socketReady: Subject<io.Server> = new Subject();
        @Inject(HttpModule.HttpController) private httpController: HttpModule.HttpController;
        @Inject(SocketModule.SocketController) private socketController: SocketModule.SocketController;
        @Inject(ServerConfig) private serverConfig: ServerConfig;

        onInit() {
            //create expressjs application
            this.app = express();            

            // configuration
            this.config();

            // http routes
            if(this.httpController) this.http();

            // socket binders
            if(this.socketController) this.socket();
        }

        /**
         * Configure application
         *
         * @class Grapple
         * @method config
         */
        public config() {  
            // enable file uploads
            this.app.use(fileUpload({
                createParentPath: true
            }));
            
            //mount json form parser
            this.app.use(bodyParser.json({ limit: '50mb' }));

            //mount query string parser
            this.app.use(bodyParser.urlencoded({
                extended: true,
                limit: '50mb'
            }));  

            // enable cors requests
            this.app.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
                next();
            });  
                        
            // custom configs
            this.serverConfig.bindConfigs(this.app);
        }

        public http() {
            let router: express.Router;
            router = express.Router();
    
            // Http Controller
            this.httpController.create(router);
    
            // use http router
            this.app.use(router);
        }

        public socket() {
            this.socketReady.subscribe((ioServer) => { 
                this.socketController.create(ioServer);
            });
        }

        static run(server: Server) {
            var http = require("http");

            var app = server.app;            
            app.set("port", process.argv[2] || 3000);

            httpServer = http.createServer(app);  

            if(server.socketController) {                
                var sockserver = io(httpServer);
                server.socketReady.next(sockserver);                
            }

            httpServer.listen(process.argv[2] || 3000);

            console.log(`Nodular server running on port ${process.argv[2] || 3000} :)`);
        }
    }
    
    export var decorators = {
        TRIGGER: "TRIGGER",        
        APIWARE: "APIWARE",            
        HTTP_GET: "HTTP_GET",
        HTTP_POST: "HTTP_POST",
        HTTP_PUT: "HTTP_PUT",
        HTTP_DELETE: "HTTP_DELETE",
        HTTP_PATCH: "HTTP_PATCH",
        HTTP_CONTROLLER: "HTTP_CONTROLLER",
        SOCKET_ON: "SOCKET_ON",
        SOCKET_CONTROLLER: "SOCKET_CONTROLLER"
    };

}

// exports
export * from './http.decorators';
export * from './socket.decorators';
export { HttpModule } from './http.controller';
export { SocketModule } from './socket.controller';