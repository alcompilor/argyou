FROM node:22-alpine3.19

WORKDIR /ws

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]