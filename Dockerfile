FROM --platform=linux/amd64 ubuntu:latest

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    libglib2.0-0 \
    libnss3 \
    libfontconfig1 \
    libxss1 \
    libxtst6 \
    libgtk-3-0 \
    libdrm2 \
    libgbm1 \
    libxshmfence1 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs


WORKDIR /app

COPY package.json package-lock.json tsconfig.json wdio.conf.ts wdio.headless.ts ./
COPY test test

RUN npm install

CMD ["npm", "run", "wdio:headless"]