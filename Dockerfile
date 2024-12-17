FROM --platform=linux/amd64 node:20.14.0-alpine
WORKDIR /app

COPY pkg /app/pkg
COPY package.json /app

ENTRYPOINT ["/app/pkg/koa-typescript-starter-alpine"]
