FROM node:13.12.0-alpine

ENV PORT=8082
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "start", "--port",$PORT]