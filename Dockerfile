FROM amble/nodemonjs7-pi

COPY ./nodular /nodular
COPY ./nodular-server /nodular-server

RUN npm i typescript -g
RUN npm i gulp -g

WORKDIR /nodular
RUN npm i
RUN tsc -p ./src
RUN npm i -g .

WORKDIR /nodular-server
RUN npm i
RUN gulp build
RUN npm i -g .