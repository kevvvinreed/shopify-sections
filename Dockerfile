FROM node:18-alpine as react-builder

ENV NODE_ENV production

WORKDIR /app

COPY package.json package.json

RUN apk add --no-cache git

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]
