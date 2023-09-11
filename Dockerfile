FROM node:18-alpine
WORKDIR /tabata-app/

COPY public/ /tabata-app/public
COPY src/ /tabata-app/src
COPY package.json /tabata-app/

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000

ENTRYPOINT ["node", "./app.js"]