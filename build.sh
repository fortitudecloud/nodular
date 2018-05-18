#!/bin/bash
echo "Building Nodular Server" 
cd nodular
npm i
tsc -p ./src
cd ../nodular-server
npm i
gulp build
cd ../passport
npm i
#cd ../build
#npm i
#cd ../console/server
#npm i
#tsc -p ./src
#cd ../web-client
#npm i
#cd ../nodular-app
#npm i
echo "Finished Building Server"
