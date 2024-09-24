# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.9.0
FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

ENV NODE_ENV="production"

FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 sqlite3

# Install node modules
COPY --link . .

RUN npm install -g pnpm@9.5.0

RUN pnpm install --prod false 

RUN pnpm build

FROM base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl
RUN npm install -g pnpm@9.5.0

COPY --from=build /app /app

RUN mkdir -p /data
VOLUME /data
EXPOSE 3000
CMD pnpm pls serve

