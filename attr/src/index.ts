import { Nodular } from './nodular';
import { Client } from './lib';

export module App {    
    export class Fruit {}
}

@Nodular([Client, App])
class Main {}