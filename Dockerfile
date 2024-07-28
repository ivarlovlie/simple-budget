# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:latest AS base
COPY ./build ./
ENV NODE_ENV=production
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "index.js" ]