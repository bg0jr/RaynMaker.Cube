ARG NODE_VERSION=18.15.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY src/price-watch/WebUI/package.json ./WebUI/
RUN npm install --prefix ./WebUI/

COPY src/price-watch/WebApi/package.json ./WebApi/
RUN npm install --prefix ./WebApi/

COPY src/price-watch/WebApi ./WebApi/
COPY src/price-watch/WebUI ./WebUI/

WORKDIR /usr/src/app/WebUI/
RUN npm run build 

WORKDIR /usr/src/app/WebApi/
RUN npm run build

WORKDIR /usr/src/app/WebApi/dist

USER node

EXPOSE 8001

CMD node server.js
