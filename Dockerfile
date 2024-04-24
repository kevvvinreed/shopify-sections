FROM node:18-alpine as react-builder

ENV NODE_ENV production

WORKDIR /app

COPY package.json package.json

RUN apk add --no-cache git

# Add debugging commands
RUN ls -la /app
RUN yarn install

COPY . .

# Check for files after copy
RUN ls -la /app

# Try building with verbose output
RUN yarn build --verbose

CMD ["yarn", "start"]
