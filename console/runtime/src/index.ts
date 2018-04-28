import { Nodular } from 'nodular';
import { ServerModule, HttpModule } from 'nodular-server';
import { ShellModule } from './app/shell';

export module ConsoleModule {
    export const decorators = {
        APP: "APP"
    };
}

@Nodular([ServerModule, HttpModule, ShellModule])
class Start {}