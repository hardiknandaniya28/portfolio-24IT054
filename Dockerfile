# Practical 11: Frontend Multi-Stage Dockerfile (Node 18 Build -> Lightweight Nginx Server)

# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package descriptors and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code and generate production build
COPY . .
RUN npm run build

# Stage 2: Lightweight production server using Nginx (Supplementary Problem)
FROM nginx:alpine

# Copy production build assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration configured for port 5173 and React Router fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose frontend port
EXPOSE 5173

# Start Nginx web server
CMD ["nginx", "-g", "daemon off;"]

