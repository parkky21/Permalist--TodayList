FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Create a .env file to store environment variables at build time (optional)
# (You would typically set these through environment variables or docker-compose)
RUN touch .env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
