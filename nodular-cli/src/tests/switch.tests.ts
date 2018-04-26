import { Arguments } from '../args';

let args = new Arguments(process.argv);

console.log(args.has('new'));