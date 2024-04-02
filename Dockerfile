FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

# Bundle app source inside the Docker image
COPY src .
COPY tsconfig* .
COPY nest-cli.json .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
