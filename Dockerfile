FROM node:10

RUN mkdir -p /usr/src/desafio-magalu-backend

WORKDIR /usr/src/desafio-magalu-backend

COPY . /usr/src/desafio-magalu-backend

RUN npm install

EXPOSE 3080

CMD ["node", "app.js"]