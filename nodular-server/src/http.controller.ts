import 'reflect-metadata';
import { Injectable, Inject, NodularContainer, Loader } from 'nodular';
import { GetVerbRoute } from './http.decorators';
import { NextFunction, Request, Response, Router } from "express";
import { ServerModule } from './index';

export module HttpModule {

    interface IActionContext {
        controller: any;   
        path: string;     
        action: any;
    }

    interface IControllerConstructor {
        (controller: HttpController): any[];
    }

    @Injectable({ factory: true })
    export class ControllerFactory {
        constructor(controller: any) {
            return [controller];
        }
    }

    @Injectable()
    export class HttpController {
        @Inject(ControllerFactory) controllerFactory: IControllerConstructor;

        /**
         * Create the routes.
         *
         * @class SystemController
         * @method create configures the router for use on the server         
         */
        public create(router: Router) {
            //log
            console.log("[HttpController::create] Mounting http controllers.");

            var loader: Loader = NodularContainer.context.getLoader();
            var _this = this;
            
            var setVerbAction = (controller: any, verb: string, setter: (context: IActionContext) => void) => {
                var inst = _this.controllerFactory(controller)[0];
                for(var func in inst) {
                    var meta = GetVerbRoute(inst, func);
                    if(meta && meta.verb == verb) setter({ controller: controller, path: meta.route, action: func });                        
                }
            }

            // get Controllers
            loader.invoke(ServerModule.decorators.HTTP_CONTROLLER, (controller) => {
                // set get routes                
                setVerbAction(controller, ServerModule.decorators.HTTP_GET, (context) => 
                    _this.get(router, context));
                
                    // set post routes
                setVerbAction(controller, ServerModule.decorators.HTTP_POST, (context) => 
                    _this.post(router, context));
                
                // set put routes
                setVerbAction(controller, ServerModule.decorators.HTTP_PUT, (context) => 
                    _this.put(router, context));
                
                // set delete routes
                setVerbAction(controller, ServerModule.decorators.HTTP_DELETE, (context) => 
                    _this.delete(router, context));

                // set patch routes
                setVerbAction(controller, ServerModule.decorators.HTTP_PATCH, (context) => 
                    _this.patch(router, context));
            });
        }

        /**
         * http Get
         * @param router 
         * @param context 
         */
        get(router: Router, context: IActionContext) {
            var handle = this.controllerFactory(context.controller)[0][context.action];

            if(Array.isArray(handle)) {
                router.get(context.path, handle);
            } else {
                router.get(context.path, (req: Request, res: Response, next: NextFunction) => {
                    handle(req, res, next);
                });        
            }            
        }

        /**
         * http Post
         * @param router 
         * @param context 
         */
        post(router: Router, context: IActionContext) {            
            var handle = this.controllerFactory(context.controller)[0][context.action];

            if(Array.isArray(handle)) {
                router.post(context.path, handle);        
            } else {
                router.post(context.path, (req: Request, res: Response, next: NextFunction) => {
                    handle(req, res, next);
                });        
            }            
        }

        /**
         * http Put
         * @param router 
         * @param context
         */
        put(router: Router, context: IActionContext) {
            var handle = this.controllerFactory(context.controller)[0][context.action];

            if(Array.isArray(handle)) {
                router.put(context.path, handle);
            } else {
                router.put(context.path, (req: Request, res: Response, next: NextFunction) => {
                    handle(req, res, next);
                });        
            }            
        }

        /**
         * http Delete
         * @param router 
         * @param context
         */
        delete(router: Router, context: IActionContext) {
            var handle = this.controllerFactory(context.controller)[0][context.action];

            if(Array.isArray(handle)) {
                router.delete(context.path, handle);
            } else {
                router.delete(context.path, (req: Request, res: Response, next: NextFunction) => {
                    handle(req, res, next);
                });        
            }            
        }

        /**
         * http Patch
         * @param router 
         * @param context
         */
        patch(router: Router, context: IActionContext) {
            var handle = this.controllerFactory(context.controller)[0][context.action];

            if(Array.isArray(handle)) {
                router.patch(context.path, handle);
            } else {
                router.patch(context.path, (req: Request, res: Response, next: NextFunction) => {
                    handle(req, res, next);
                });        
            }            
        }

        /**
         * Constructor
         *
         * @class HttpController
         * @constructor
         */
        constructor() {        
        }    
    }

}