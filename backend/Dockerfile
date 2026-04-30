FROM node:20-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    
    RUN npm install
    
    COPY prisma ./prisma
    
    # RUN npx prisma generate

    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    
    COPY --from=builder /app/node_modules ./node_modules
    COPY . .
    
    USER node
    EXPOSE 3001
    CMD ["node", "main.js"]