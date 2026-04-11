# ── Stage 1: Build the React app ──────────────────────
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build for production
COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ─────────────────────────
FROM nginx:alpine

# Copy built React files to Nginx's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]