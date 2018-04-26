#!/usr/bin/env node

import { Arguments } from '../index';

var clone = require('git-clone');

let args = new Arguments(process.argv);

if(args.has('new')) {
    var target = args.get('new');
    console.log("Creating Nodular Server app...")
    clone('https://github.com/fortitudecloud/grapple-base.git', target, {}, (e) => {
        console.log(target + ' was created');
    });
}