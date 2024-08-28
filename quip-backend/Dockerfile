FROM node:lts-alpine3.20
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm","run","start", "--", "--hostname", "0.0.0.0" ]
