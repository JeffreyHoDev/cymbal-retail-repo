
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose your app port
EXPOSE 3000

# Start your app
CMD ["npm", "start"]
