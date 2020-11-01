FROM node:13.12.0-alpine

WORKDIR /app

COPY . /app
# COPY package.json /app

RUN npm rebuild node-sass
RUN npm install


CMD ["npm", "run", "start-prod"]