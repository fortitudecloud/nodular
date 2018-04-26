@echo off
echo Building Nodular Server
cd nodular 
npm i 
tsc -p ./src 
cd ../nodular-server 
npm i 
gulp build 
cd ../build 
npm i
echo Finished Building Server