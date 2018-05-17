FROM amble/nodemonjs7-pi

COPY ./nodular /nodular
COPY ./nodular-server /nodular-server
COPY ./nodular-app /nodular-app

RUN npm i typescript -g
RUN npm i gulp -g

WORKDIR /nodular-server
RUN npm i
RUN gulp build

WORKDIR ../nodular-app
RUN npm i
RUN tsc -p ./src

EXPOSE 3000
EXPOSE 9222

CMD [ "npm", "run", "inspect" ]