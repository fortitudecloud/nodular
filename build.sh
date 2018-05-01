#!/bin/bash
echo "Building Nodular Server" 
cd nodular
npm i
tsc -p ./src
cd ../nodular-server
npm i
gulp build
cd ../build
npm i
cd ../console/server
npm i
tsc -p ./src
cd ../web-client
npm i
tsc -p ./src
cd ../web-client-angular
npm i
echo "Finished Building Server"
