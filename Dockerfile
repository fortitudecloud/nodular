FROM amble/nodemonjs7-pi

WORKDIR /nodular/nodular-server
COPY . /nodular

RUN npm install -g typescript
RUN npm install -g gulp

RUN npm install

RUN gulp build

EXPOSE 3000
EXPOSE 5858

CMD [ "npm", "run", "debug" ]