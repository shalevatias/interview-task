FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --only=production

COPY . .

CMD ["node", "index.js"]
