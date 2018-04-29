import { Injectable, Inject, Loader } from '../nodular';
import { NodularContainer } from '../container';

interface IGreeting {
    //animal: string;    
    greet(): string;
}

const TYPES = {
    Greeting: "Greeting",
    Response: "Response"
};

var service;
var paramless;
var single;

module ContainerTests {
    @Injectable({        
        resolver: () => { return { name: 'Hoggy' }; }
    })
    export class Service {
        constructor(public name: string) {}
    }

    @Injectable()
    export class ParameterLess { 
        hello(): string {
            return 'Hello';
        }
    }

    @Injectable({
        resolver: () => { return { animal: 'Cat' }; },            
        singleton: true
    })
    export class Singleton {
        constructor(public animal: string) {}        
    }    

    @Injectable({ factory: true })
    export class ResponseFactory {  
        constructor(response: string) {
            var params = { res: response };
            @Injectable({
                resolver: () => params,
                //bind: (Response) => TYPES.Response
            })
            class Response {
                constructor(private res: string) {}
                talk(): string { return this.res; }
            }  
            
            return [Response];
        }
    }

    @Injectable({                
        bind: () => TYPES.Greeting
    })
    export class Message implements IGreeting {       
        @Inject(ParameterLess) private greeting: ParameterLess;
        @Inject(Service) private nameService: Service;
        @Inject(Singleton) private animalSingleton: Singleton;
        @Inject(ResponseFactory) private responseFactory: (response: string) => any[]; // would have interface

        private response: { talk(): string };

        // constructor(             
        //     public animal: string) { }        

        onInit() {
            this.response = this.responseFactory('Woof!')[0];
        }

        greet(): string {
            return `${this.greeting.hello()} ${this.nameService.name} ${this.animalSingleton.animal}.
            ${this.nameService.name} says "${this.response.talk()}"`;
        }
    } 

    @Injectable({
        bind: () => "BINDERCLASS",
        singleton: true
    })
    export class BinderClass {
        name: string = 'Hoggs';
    }
    
    @Injectable()
    export class HasBinder {
        @Inject("BINDERCLASS") bClass: any;

        getName(): string {
            return this.bClass.name;
        }
    }
    
}

var loader = new Loader();
loader.register([ContainerTests]);
loader.discover();

var ioc = new NodularContainer(loader);

ioc.register('service', function(name) {
    return {
        name: 'Hello ' + name
    }
});

// ioc.resolve([ContainerTests.Service], (s) => {
//     service = s('Hoggy');
// })();

// ioc.resolve([ContainerTests.ParameterLess], (p) => paramless = p)();

ioc.resolve(['service'], function(service) {
    console.log(service('Puma').name);
})();

function build(invoker: () => any, services: (...a) => void) {
    var injects = invoker();
    for(var i in injects) ioc.runtimeHash(injects[i]);
    ioc.resolve(injects, (...s) => {
        var injectedServices = [];
        for(var ser in s) injectedServices.push((<any>s[ser])());
        services(injectedServices);
    })();
}

// ioc.resolve([ContainerTests.ResponseFactory], (f) => {
//     var factory = f('Woof!');
//     console.log(factory);
//     // build(() => f('Woof!'), (response) => {
//     //     console.log(response[0].talk());
//     // });
//     console.log(factory[0].talk());
// })();

ioc.resolve([ContainerTests.Singleton], (s) => single = s)();
single.animal = 'Dog'
// ioc.resolve([ContainerTests.Singleton], (s) => single = s)();

ioc.resolve([TYPES.Greeting], (m) => {
    //console.log(m(paramless.hello(), service.name, single.animal).greet());
    //var res = rf('Woof!');
    console.log(m().greet());
})();

ioc.resolve([ContainerTests.HasBinder], (b) => {
    console.log(b().getName());
})();

// console.log(paramless.hello());
// console.log(service.name);
// console.log(single.animal);