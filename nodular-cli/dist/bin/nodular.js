#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var clone = require('git-clone');
var args = new index_1.Arguments(process.argv);
if (args.has('new')) {
    var target = args.get('new');
    console.log("Creating Nodular Server app...");
    clone('https://github.com/fortitudecloud/grapple-base.git', target, {}, function (e) {
        console.log(target + ' was created');
    });
}
//# sourceMappingURL=nodular.js.map