# 1. Use Node.js LTS as base image
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package.json package-lock.json* ./ 
# If using yarn, replace with: COPY package.json yarn.lock ./

# 4. Install dependencies
RUN npm install --frozen-lockfile

# 5. Copy all source files
COPY . .

# Accept build argument
ARG NEXT_PUBLIC_PRICE_ALERT_API_URL
ENV NEXT_PUBLIC_PRICE_ALERT_API_URL=$NEXT_PUBLIC_PRICE_ALERT_API_URL

# 6. Build the Next.js app
RUN npm run build

# ----------------------------
# Production image
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Only copy necessary files for production
COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --production --frozen-lockfile

# Expose port
EXPOSE 3001

# Start the Next.js server
CMD ["npm", "start","--","-p","3001"]