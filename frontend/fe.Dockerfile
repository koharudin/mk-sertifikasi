FROM node:20-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
#RUN npm install

#RUN npx prisma generate

#CMD ["node", "index.js"]