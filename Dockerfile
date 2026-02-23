FROM node:22
EXPOSE 80

WORKDIR /app

ADD .output /app/.output

ENV NITRO_PORT=80
ENV NITRO_HOST='0.0.0.0'

CMD ["node", ".output/server/index.mjs"]
