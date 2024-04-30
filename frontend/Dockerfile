FROM node:22-alpine3.18 as build

COPY . .

RUN npm install

RUN npm run build



FROM nginx:1.25.5-alpine as production

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /dist /usr/share/nginx/html/argyou-frontend

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]