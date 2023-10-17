FROM node:18

RUN mkdir -p /usr/src/app/dist/
WORKDIR /usr/src/app/

COPY ./dist /usr/src/app/dist/
COPY ./package.json /usr/src/app/package.json
COPY ./.env /usr/src/app/.env
COPY ./package-lock.json /usr/src/app/package-lock.json

RUN npm ci --omit=dev

EXPOSE 3002

CMD ["npm", "run", "up:prod"]
