FROM node:current

WORKDIR /remix-praktik

COPY . .

RUN npm i
RUN npm run build

CMD [ "npm", "run", "start" ]