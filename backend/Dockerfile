FROM node:18.20.8-alpine3.20

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY backend ./backend
COPY uploads ./uploads

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["node", "backend/server.js"]
