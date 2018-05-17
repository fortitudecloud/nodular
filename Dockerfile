FROM amble/nodemonjs7-pi

COPY ./@types /@types
COPY ./nodular /nodular
COPY ./nodular-server /nodular-server
COPY ./apps /nodular-app
#COPY ./nodular-app /nodular-app/app

RUN npm i typescript -g
RUN npm i gulp -g

WORKDIR /nodular
RUN npm i
RUN tsc -p ./src
#RUN npm i -g .

WORKDIR /nodular-server
RUN npm i
RUN gulp build
#RUN npm i -g .

WORKDIR /nodular-app
RUN npm i

WORKDIR ./debug
RUN npm i
RUN tsc -p ./src

EXPOSE 3000
EXPOSE 9222

CMD [ "npm", "run", "inspect" ]