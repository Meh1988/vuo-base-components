# # ff.api Dockerfile

# FROM node:20.12-alpine3.18

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose port (optional, since you're mapping ports in docker-compose)
# EXPOSE 7702

# # Start the application
# CMD ["npm", "run", "start"]

# Use the official Node.js image
# FROM node:20.12-alpine3.18

# ARG FIREBASE_PROJECT_ID
# ARG FIREBASE_PRIVATE_KEY

# ARG FIREBASE_CLIENT_EMAIL
# ARG SENTRY_AUTH_TOKEN
# ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

# # Use build:dev for development builds without Sentry
# RUN if [ "$NODE_ENV" = "production" ]; then \
#       npm run build; \
#     else \
#       npm run build:dev; \
#     fi

# FROM node:20-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./
# RUN npm install --global nodemon
# RUN npm install

# # Bundle app source
# COPY . .

# # Build the TypeScript code
# RUN npm run build

# # Expose port
# EXPOSE 8080

# # Start the app
# # CMD ["node", "dist/index.js"]
# CMD ["npm", "run", "dev"]

# Build arguments
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_PRIVATE_KEY
ARG FIREBASE_CLIENT_EMAIL
ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN
ARG NODE_ENV=production

FROM node:20-alpine

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

# Create app directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build based on environment
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build; \
    else \
      npm run build:dev; \
    fi

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]