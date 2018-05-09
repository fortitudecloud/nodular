# This dockerfile assumes ../build.sh has been run prior to building

FROM amble/nodemonjs7-pi

WORKDIR /server
COPY . /server

EXPOSE 3000
EXPOSE 5858

CMD [ "npm", "run", "inspect" ]