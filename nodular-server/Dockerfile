FROM amble/nodemonjs7-pi

WORKDIR /server
COPY . /server

RUN npm install -g typescript

RUN npm install

RUN tsc -p ./src

EXPOSE 3000

CMD [ "npm", "run", "start" ]