FROM node:10.0.0

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]