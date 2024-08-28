FROM node:lts-alpine3.20
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . /app/

CMD ["sh", "-c", "npx prisma db push && npm run start -- --host 0.0.0.0"]