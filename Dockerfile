FROM node:18-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM base as production

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/src/server.js"]
