FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

COPY proxy.conf.json /app/proxy.conf.json

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
