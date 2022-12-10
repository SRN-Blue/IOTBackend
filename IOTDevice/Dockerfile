FROM node:lts-alpine
LABEL maintainer="Liana Studio Soren"

WORKDIR /app2

COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

ENV PORT=8081

EXPOSE 8081

CMD [ "node", "app.js" ]