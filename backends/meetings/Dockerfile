FROM node:12-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD package.json yarn.lock /app/
RUN yarn
ADD *.js **/*.js /app/
CMD ["node", "app.js"]
