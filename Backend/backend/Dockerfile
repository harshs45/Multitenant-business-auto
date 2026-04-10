FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Use non-root user for security (provided by the node alpine image)
USER node

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
