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

ARG FIREBASE_PROJECT_ID
ARG FIREBASE_PRIVATE_KEY
ARG FIREBASE_CLIENT_EMAIL

FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port
EXPOSE 8080

# Start the app
# CMD ["node", "dist/index.js"]
CMD ["npm", "run", "start"]