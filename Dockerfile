FROM node:18

RUN apt-get update && apt-get install -y make gcc g++ python3 libpq-dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]