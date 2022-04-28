FROM node:18-alpine

LABEL version="0.1.0"

COPY . /home/node/app
WORKDIR /home/node/app

EXPOSE 3000

RUN ["yarn", "build"]
CMD ["yarn", "start"]