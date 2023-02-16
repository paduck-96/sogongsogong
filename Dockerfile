FROM node:18.12.1
WORKDIR /app
COPY . .
RUN yarn install

WORKDIR /app/client
RUN npm install

WORKDIR /app
RUN npm install

EXPOSE 3000

WORKDIR /app
CMD ["yarn", "dev"]