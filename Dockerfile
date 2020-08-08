# Dockerfile

FROM node:12.8-alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . /usr/src

RUN npm install

RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]
