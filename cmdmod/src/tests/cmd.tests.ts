import { Injectable, Nodular } from 'nodular'
import { CMDMod, Cmd } from '../index'

export module HelloMod {       
    @Cmd({
        command: 'hw [text]',
        description: 'Helloworld command app',
        switches: [{ short: '-n', long: '--fname <nm>', desc: 'Your name' }]
    })
    export class HelloCmd {
        run(text, options) {
            if(options && options.fname) {
                console.log('hello. Your name is ' + options.fname);
            } else {
                console.debug('hello ' + text);
            }            
        }
    }
}

@Nodular([CMDMod, HelloMod])
class Start { }