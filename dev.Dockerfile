FROM node:20.16.0-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY next.config.js ./
COPY public ./public
COPY package.json ./

COPY app ./app
COPY base ./base
COPY components ./components
COPY constants ./constants
COPY core ./core
COPY helpers ./helpers
COPY lib ./lib
COPY pages ./pages
COPY routes ./routers
COPY src ./src
COPY styles ./styles

COPY .env ./
COPY .env.development.local ./

COPY .eslintrc ./
COPY .sentryclirc ./
COPY .stylelintrc.js ./
COPY css.d.ts ./
COPY globals.d.ts ./
COPY instrumentation.ts ./
COPY next-env.d.ts ./
COPY sentry.client.config.ts ./
COPY sentry.server.config.ts ./
COPY tsconfig.json ./

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Start Next.js in development mode based on the preferred package manager
CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  elif [ -f package-lock.json ]; then npm run dev; \
  elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
  else npm run dev; \
  fi
