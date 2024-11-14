ARG VITE_FFAPI_BASE_URL
ARG VITE_FIREBASE_WEB_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID   
ARG VITE_GTM_ID

FROM node:20.12-alpine3.18 AS build

# Set the working directory
WORKDIR /app

# Add libc6-compat and update npm
RUN apk add --no-cache libc6-compat
RUN npm install -g npm@latest

# Install dependencies and build the app
COPY package*.json ./
RUN npm install --platform=linuxmusl --arch=x64
COPY . .
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
