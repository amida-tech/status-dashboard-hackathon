FROM node:12-alpine as builder
ARG WMATA_API_KEY
WORKDIR /app

RUN apk add --upgrade gettext
COPY package.json package-lock.json /app/
RUN npm i

COPY . .
RUN envsubst < src/config.docker.js > src/config.js
RUN cat src/config.js
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
