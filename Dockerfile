FROM node:current-alpine3.19

WORKDIR /www/remix-praktik

COPY . .

RUN npm i
RUN npm run build

CMD [ "npm", "run", "start" ]