FROM node:10

RUN mkdir -p /usr/src/desafio-magalu-backend

WORKDIR /usr/src/desafio-magalu-backend

COPY . /usr/src/desafio-magalu-backend

RUN npm install
RUN npm run build

EXPOSE 3080

CMD ["npm", "dev"]