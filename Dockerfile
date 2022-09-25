FROM node:16.14.0-alpine3.15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .next /usr/src/app/.next
COPY public /usr/src/app/public
COPY package.json /usr/src/app/package.json
COPY next.config.js /usr/src/app/next.config.js
COPY node_modules /usr/src/app/node_modules

EXPOSE 8080

CMD ["env"]

CMD [ "npm", "start" ]
