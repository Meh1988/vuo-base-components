# Step 1: Use Node.js as the base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Validate TypeScript code before building
RUN npm run build:check

# Step 7: Build the TypeScript code into JavaScript
RUN npm run build

# Step 8: Expose the API port
EXPOSE 3000

# Step 9: Set the default command to run the application
CMD ["node", "dist/index.js"]