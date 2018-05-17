# This dockerfile is to be used if an app is considered release ready
# While in development, the implementer will pull and run the lionelsdocker/nodular-server image directory
# This image will have a default app for which needs to be replaced by a "synced" app. 
# Steps for debugging
# * Pull and run lionelsdocker/nodular-server, mounting the containers /dist folder to a volume/file system
# * Run nobone-sync server, mounting the volumne/file system containing the nodular-server /dist folder to the internal structure setup in nobone-sync container
# * Install and build your client nodular app locally
# * Run nobone-sync client from local app folder
# * Run the 'Attach to Docker Remote' launch setting to start debugging

# Depending on how nodular-server is setup, this should sync the local app to the server, restart the server and allow debugging on the remote docker instance (in the cloud)

FROM lionelsdocker/nodular-server

RUN ls

RUN npm install -g typescript

RUN npm install

RUN tsc -p ./src

COPY ./dist /dist