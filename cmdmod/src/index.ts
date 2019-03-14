import 'reflect-metadata'
import { Entry, Inject, InjectableOptions } from 'nodular'
import * as program from 'commander'

export module CMDMod {
    @Entry()
    export class Run {
        @Inject('Command') cmd: Command;

        static run(command: Run) {           
            var options: CommandOptions = Reflect.getMetadata('cmd', (<any>command.cmd).__proto__.constructor);

            var prog =
                program
                .command(options.command)
                .description(options.description);

            options.switches.forEach((v) => {
                prog.option(`${v.short}, ${v.long}, ${v.desc}`);
            });                        
            prog.action((...a) => command.cmd.run(...a));

            program.parse(process.argv);
        }
    } 
}

export function Cmd(cmd: CommandOptions, options?: InjectableOptions) {    
    return function (target: any) {
        if(options) options.bind = () => 'Command';
        else options = { bind: () => 'Command' };
        Reflect.defineMetadata('injectable', options || {}, target);
        Reflect.defineMetadata('cmd', cmd, target);
    }
}

interface CommandOptions {
    command: string;
    description: string;
    switches: { short: string, long: string, desc: string }[]
}

interface Command {
    run(...a);
}