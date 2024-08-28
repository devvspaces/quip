FROM node:lts-alpine3.20
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "entrypoint.sh" ]
