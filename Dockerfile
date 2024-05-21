FROM node:18.19.1
LABEL authors="viniciuslima"

RUN apt-get update && apt-get install -y wget

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /transferService

COPY . .

RUN rm -rf node_modules
RUN yarn install

CMD dockerize -wait tcp://172.24.0.2:5432 -timeout 60s sh -c "yarn prisma:dev initialMigration && yarn start"d

EXPOSE 3030