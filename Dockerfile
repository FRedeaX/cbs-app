# Install dependencies only when needed
FROM node:20.5.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ./web/package*.json ./
RUN npm install 

# Rebuild the source code only when needed
FROM node:20.5.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./web .

RUN npm run build

# Production image, copy all the files and run next
FROM node:20.5.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/app ./app
COPY --from=builder /app/base ./base
COPY --from=builder /app/components ./components
COPY --from=builder /app/constants ./constants
COPY --from=builder /app/core ./core
COPY --from=builder /app/helpers ./helpers
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/routes ./routers
COPY --from=builder /app/src ./src
COPY --from=builder /app/styles ./styles

COPY --from=builder /app/.env ./
COPY --from=builder /app/.env.production ./

COPY --from=builder /app/.eslintrc ./
COPY --from=builder /app/.sentryclirc ./
COPY --from=builder /app/.stylelintrc.js ./
COPY --from=builder /app/css.d.ts ./
COPY --from=builder /app/globals.d.ts ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/sentry.client.config.ts ./
COPY --from=builder /app/sentry.edge.config.ts ./
COPY --from=builder /app/sentry.server.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]