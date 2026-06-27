# Use the official lightweight Node LTS image
FROM node:24

# Set the working directory inside the container
WORKDIR /src/app

# Copy package configuration files first to utilize Docker layer caching
COPY package*.json ./

# Install only production dependencies for a smaller, secure image
RUN npm i

# Copy the rest of your Express application source code
COPY . .

# Inform Docker that the container listens on port 5000 at runtime
EXPOSE 5000

# Run the app securely using a non-root user built into the Node image
USER node

# Define the default command to launch your Express application
CMD ["node", "index.js"]
