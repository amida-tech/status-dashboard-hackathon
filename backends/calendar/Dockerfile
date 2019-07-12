FROM node:12-alpine
MAINTAINER ops@amida.com
WORKDIR /app
RUN apk add --update gettext # for envsubst
COPY package.json .
RUN npm i
COPY . .
ENTRYPOINT /app/entrypoint.sh
