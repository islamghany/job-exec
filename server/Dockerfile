# Stage 1: Build Stage for Node.js app
FROM node:14-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 2: Setup the runtime environment
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json



# Expose the port the app runs on 8080
EXPOSE 8080

# Serve the app
CMD ["node", "dist/index.js"]
