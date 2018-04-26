export class Arguments {
    constructor(private args: string[]) {
    }

    /** arguments contain this switch */
    has(arg: string): boolean {
        if(this.args.find(a => a == (arg))) return true;
        else return false;
    }

    /** gets the value for this switch */
    get(arg: string): string {
        var value: string;
        this.args.filter((v,e) => {            
            if(v == (arg) && e !== (this.args.length-1)) {
                value = this.args[e+1];
            }
        });
        return value;
    }
}