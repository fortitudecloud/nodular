# This dockerfile assumes ../build.sh has been run prior to building

FROM amble/nodemonjs7-pi

WORKDIR /server
COPY . /server

RUN npm i typescript -g
RUN npm i gulp -g

RUN npm i
RUN gulp build

EXPOSE 3000
EXPOSE 9222

CMD [ "npm", "run", "inspect" ]