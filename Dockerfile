FROM node:18.12.1 as builder

WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm install

COPY ./client .

RUN npm run build

FROM node:18.12.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=builder /app/client/build /app/client/build

COPY . .

EXPOSE 80
ENTRYPOINT [ "npm", "start"]