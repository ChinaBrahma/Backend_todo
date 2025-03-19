# Use official nodejs runtime as parent image
FROM node:22-alpine

# Set working dir in the container
WORKDIR /app

# Copy to package.json and packege-lock.json to the container (beswr mwnnwi kou labwna modules pwrkou install kalamnw hagwn)
COPY package*.json .

# Install the dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Expose the port the docker container is running on
EXPOSE 5000

# Define the command to run your application
CMD ["node", "./src/server.js"]
