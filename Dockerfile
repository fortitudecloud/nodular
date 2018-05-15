FROM amble/nodemonjs7-pi

WORKDIR /nodular-server
COPY ./nodular /nodular
COPY ./nodular-server /nodular-server
COPY ./@types ./@types

RUN npm i typescript -g
RUN npm i gulp -g

RUN npm i
RUN gulp build

EXPOSE 3000
EXPOSE 9222

CMD [ "npm", "run", "inspect" ]