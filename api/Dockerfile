FROM node:14
WORKDIR /usr/src/app/api
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install bash
COPY . ./
EXPOSE 3333
CMD [ "npm", "run", "dev"]