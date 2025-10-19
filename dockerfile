# Dockerfile per Next.js Portfolio
FROM node:20-alpine AS base

# Installa dipendenze solo quando necessario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia package files
COPY package.json package-lock.json* ./
RUN npm ci

# Build dell'applicazione
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_SEND_EMAIL_ENDPOINT
ARG NEXT_PUBLIC_API_DOWNLOAD_CV_ENDPOINT
ARG NEXT_PUBLIC_API_GET_JARVIS_STATUS_ENDPOINT
ARG NEXT_PUBLIC_API_POST_JARVIS_MESSAGE_ENDPOINT

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_SEND_EMAIL_ENDPOINT=$NEXT_PUBLIC_API_SEND_EMAIL_ENDPOINT
ENV NEXT_PUBLIC_API_DOWNLOAD_CV_ENDPOINT=$NEXT_PUBLIC_API_DOWNLOAD_CV_ENDPOINT
ENV NEXT_PUBLIC_API_GET_JARVIS_STATUS_ENDPOINT=$NEXT_PUBLIC_API_GET_JARVIS_STATUS_ENDPOINT
ENV NEXT_PUBLIC_API_POST_JARVIS_MESSAGE_ENDPOINT=$NEXT_PUBLIC_API_POST_JARVIS_MESSAGE_ENDPOINT

# Disabilita telemetry durante build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Immagine di produzione
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia i file necessari
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]