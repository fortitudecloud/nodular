import { Nodular } from 'nodular';
import { ServerModule } from 'nodular-server';
import { ShellModule } from './app/shell';

export module ConsoleModule {
    export const decorators = {
        APP: "APP"
    };
}

@Nodular([ServerModule, ShellModule])
class Start {}