ARG VITE_FFAPI_BASE_URL
ARG VITE_FIREBASE_WEB_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID   
ARG VITE_GTM_ID
ARG VITE_SENTRY_DSN
ARG VITE_SENTRY_AUTH_TOKEN

FROM node:20.12-alpine3.18
USER root
RUN apk update

RUN mkdir -p /app
COPY package*.json /app/

WORKDIR /app

RUN npm install
COPY . /app



# FROM node:20.12-alpine3.18

# # Print current directory for debugging
# RUN mkdir -p /app && pwd && ls -la

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json from the build context
# # COPY package*.json ./
# COPY package*.json /app/

# # Install dependencies
# RUN npm install

# # Copy the rest of the source code
# COPY . .

# # Expose the port your app will use
# EXPOSE 7702

# # Start the application
# CMD ["npm", "start"]

