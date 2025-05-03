FROM selenium/standalone-chromium:latest

WORKDIR /app
USER root
ENV HOME=/root

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update && apt-get install -y nodejs

COPY package.json package-lock.json tsconfig.json wdio.conf.ts wdio.headless.ts ./
COPY test test

RUN npm install
