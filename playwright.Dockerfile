FROM mcr.microsoft.com/playwright:v1.50.1-noble

WORKDIR /tests

COPY package*.json ./

RUN npm install

COPY tests/ ./tests/
COPY src/ ./src/
COPY config/ ./config/
COPY playwright.config.ts ./
COPY tsconfig.json ./
COPY .env ./

ENTRYPOINT ["npm", "test"]