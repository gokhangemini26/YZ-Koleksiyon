# apps/api/Dockerfile (Production)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy Monorepo Configs
COPY package.json tsconfig.json ./

# Copy API Source
COPY apps/api ./apps/api
COPY packages ./packages

# Install Dependencies and Build
# In a real monorepo we would use 'npm ci' and 'turbo prune'
# Here we stick to a simpler install since we constructed the package.json manually
RUN npm install
RUN npx prisma generate --schema=./packages/database/schema.prisma
RUN npm run build -w @fashion-erp/api

# --- Runner Stage ---
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
# We need prisma client in prod
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/packages ./packages

CMD ["node", "dist/main"]
