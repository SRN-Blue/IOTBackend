FROM node:lts-alpine
LABEL maintainer="Liana Studio Soren"

WORKDIR /app

COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

ENV PORT=8000

EXPOSE 8000

CMD [ "node", "app.js" ]