import { Injectable, Nodular } from 'nodular'
import { CMDMod, Cmd } from '../index'

export module HelloMod {       
    @Cmd({
        command: 'hw [text]',
        switches: []
    })
    export class HelloCmd {
        run(text) {
            console.debug('hello ' + text);
        }
    }
}

@Nodular([CMDMod, HelloMod])
class Start { }