# apps/web/Dockerfile (Production)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy Configs
COPY package.json tsconfig.json ./
COPY apps/web ./apps/web

# Install and Build
RUN npm install
RUN npm run build -w @fashion-erp/web

# --- Runner Stage ---
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Expose HTTP
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
