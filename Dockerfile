# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY . .
COPY .env .env

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built Vite app
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 inside container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
