# Step 1: Use the official Node.js 18 image from Docker Hub as the base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./


RUN npm install


# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port the app runs on (assuming it's port 3000)
EXPOSE 5000


# Step 8: Command to run your application
CMD ["nodemon", "server.js"]
