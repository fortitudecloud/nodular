FROM hypriot/rpi-node

RUN mkdir code
WORKDIR /code

RUN npm install -g nobone-sync

EXPOSE 8345

CMD [ "nobone-sync", "-s" ]