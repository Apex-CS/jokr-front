FROM node:14-alpine

WORKDIR /app
COPY . .

RUN npm install
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
ENTRYPOINT ["npm", "run", "dev"]
