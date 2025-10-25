FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma Client BEFORE copying other files
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "dist/server.js"]