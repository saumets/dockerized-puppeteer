FROM node:8-alpine

RUN apk add --no-cache python make g++ bind-tools

RUN mkdir -p /app
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY ./ /app/
RUN npm install

ENTRYPOINT ["npm"]
CMD ["start"]
