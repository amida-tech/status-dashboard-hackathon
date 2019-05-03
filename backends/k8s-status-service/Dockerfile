# Builder image
FROM node:12.0.0-alpine as builder

WORKDIR /app

COPY . /app/
RUN npm install

# Runner image
FROM node:12.0.0-alpine

WORKDIR /app

COPY --from=builder /app/ /app/

USER 50000:50000

EXPOSE 3000

CMD ["npm", "run", "prod-start"]
