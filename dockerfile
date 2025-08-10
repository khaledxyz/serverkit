# stage 1: Base image with pnpm
FROM node:22-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

# stage 2: install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# stage 3: development
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# stage 4: build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# optional build args for analytics
ARG VITE_ANALYTICS_SCRIPT_URL
ARG VITE_ANALYTICS_WEBSITE_ID
ENV VITE_ANALYTICS_SCRIPT_URL=${VITE_ANALYTICS_SCRIPT_URL}
ENV VITE_ANALYTICS_WEBSITE_ID=${VITE_ANALYTICS_WEBSITE_ID}

RUN pnpm build

# stage 5: production (serve static files)
FROM node:22-alpine AS production
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]