FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY  package*.json ./


# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "preview"]