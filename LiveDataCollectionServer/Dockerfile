FROM node:lts-alpine
LABEL maintainer="Liana Studio Soren"

WORKDIR /app3

COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "app.js" ]