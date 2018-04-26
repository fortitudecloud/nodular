import { Injectable, Inject, Entry, Nodular } from '../nodular';

export module EntryModule {

    @Injectable()
    export class Runner {
        Message = 'We are running';
    }

    @Entry()
    export class EntryClass {
        @Inject(Runner) private runner: Runner;

        static run(e: EntryClass) {
            console.log(e.runner.Message);
        }
    }
}

@Nodular([EntryModule])
class Start { }