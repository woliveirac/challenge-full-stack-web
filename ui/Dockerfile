FROM node:14
WORKDIR /usr/src/app/ui
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 8080
CMD [ "npm", "run", "serve"]