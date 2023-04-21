FROM node:alpine3.16

WORKDIR /app
COPY package.json .

RUN npm i

COPY . .

EXPOSE 3333

CMD ["node", "server.js"]