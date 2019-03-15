import { Injectable, Inject, Entry, Nodular, Mod } from '../nodular';

export module EntryModule {  
    @Entry()
    export class EntryClass {
        @Inject('bindClass') private runner: IRunner;

        static run(e: EntryClass) {
            console.log(e.runner.Message);
        }
    }
}

// Add MOD
Mod(EntryModule);

interface IRunner {
    Message: string;
}

module RuntimeMod {
    @Injectable({
        bind: () => 'bindClass'
    })
    export class Runner {
        Message = 'We are running';
    }
}

@Nodular([RuntimeMod])
class Start { }