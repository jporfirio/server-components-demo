FROM node:16-bullseye-slim as base

RUN apt-get update && apt-get install -y openssl

ENV NODE_ENV=production

# install all node_modules, including dev
FROM base as deps

WORKDIR /opt/notes-app

COPY package.json package-lock.json ./
COPY scripts ./

RUN npm install

COPY . .

ADD prisma .
RUN npx prisma generate
RUN npm run build

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
