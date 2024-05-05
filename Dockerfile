ARG NODE_VERSION=18.15.0
FROM --platform=linux/arm64/v8 node:${NODE_VERSION}-alpine as build-stage

ENV NODE_ENV development

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY src/price-watch/WebUI/package.json ./WebUI/
RUN pnpm install --prefix ./WebUI/

COPY src/price-watch/WebApi/package.json ./WebApi/
RUN pnpm install --prefix ./WebApi/

COPY src/price-watch/WebApi ./WebApi/
COPY src/price-watch/WebUI ./WebUI/

WORKDIR /usr/src/app/WebUI/
RUN pnpm run build 

WORKDIR /usr/src/app/WebApi/
RUN pnpm run build


FROM --platform=linux/arm64/v8 alpine as production-stage

RUN apk add --update nodejs

RUN addgroup -S node && adduser -S node -G node
USER node

COPY --from=build-stage /usr/src/app/WebApi/dist /app/
WORKDIR /app/

EXPOSE 8001

CMD node server.js
