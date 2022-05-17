#compile
FROM node:16-alpine as ts-compiler
WORKDIR /usr/podium-server
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build

#build prod and run
FROM node:16-alpine as ts-run
WORKDIR /usr/podium-server
COPY --from=ts-compiler /usr/podium-server/package*.json ./
COPY --from=ts-compiler /usr/podium-server/dist ./dist
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
