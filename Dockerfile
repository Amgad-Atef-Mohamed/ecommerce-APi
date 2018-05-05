FROM node:8.9.4-alpine

RUN npm install sequelize-cli -g

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app

# Expose the port the app runs in
EXPOSE 1337

CMD sequelize db:migrate && sequelize db:seed:all && npm start