# ----- Stage 1: Build React App -----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

# ----- Stage 2: Set up Express server -----
FROM node:20-alpine
WORKDIR /app

# Install web_service dependencies only
COPY web_service/package*.json ./web_service/
WORKDIR /app/web_service
RUN npm install --omit=dev

# Copy the Express server files
COPY web_service ./

# Copy the React build output from previous stage
COPY --from=build /app/build ./public

# Copy only the web_service .env file
COPY web_service/.env .env

EXPOSE 80
CMD ["node", "service.js"]
