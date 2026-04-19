FROM oven/bun:1.1-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ gcc libc-dev

COPY package.json bun.lock ./

RUN bun install --ignore-scripts

COPY . .

EXPOSE 5000

CMD [ "bun","run","start" ]
