FROM node:22-alpine3.18

WORKDIR /server

COPY . /server/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]