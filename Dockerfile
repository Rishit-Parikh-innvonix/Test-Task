# Stage 1 - Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev --ignore-scripts

# Copy rest of the app
COPY . .

# Ensure .env is available at build time (for Vite)
COPY .env .env

# Build the app (output goes to /app/dist)
RUN npm run build