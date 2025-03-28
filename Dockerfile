# Use an official Node.js image
FROM node:20

# Create app directory
WORKDIR /usr/src/app/tokenbay/client

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "dist"]
