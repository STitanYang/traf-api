FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:23-alpine AS prod
WORKDIR /app
COPY package*.json .
RUN npm clean-install --only=production
COPY --from=build /app/build ./build
COPY .env .
COPY ./assets ./assets
CMD ["node", "build/app.js"]
