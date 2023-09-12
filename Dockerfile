FROM node As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install development

COPY . .

RUN npm run build

FROM node as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

ENV PORT=5000

EXPOSE $PORT

CMD ["node", "dist/main"]