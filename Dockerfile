# Install dependencies only when needed
FROM node:17-alpine3.12 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:17-alpine3.12 AS builder

ARG CF_SPACE_ID
ARG CF_DELIVERY_ACCESS_TOKEN
ARG CF_PREVIEW_ACCESS_TOKEN
ARG CF_ENVIRONMENT
ARG PATREON_ACCESS_TOKEN
ARG PATREON_CAMPAIGN_ID

ARG GOOGLE_TAG_MANAGER_CONTAINER_ID
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID=$GOOGLE_TAG_MANAGER_CONTAINER_ID

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-optional --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:17-alpine3.12 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN apk add --no-cache tini

ARG CF_SPACE_ID
ARG CF_DELIVERY_ACCESS_TOKEN
ARG CF_PREVIEW_ACCESS_TOKEN
ARG CF_ENVIRONMENT
ARG PORT=80
ARG PATREON_ACCESS_TOKEN
ARG PATREON_CAMPAIGN_ID
ARG MAILCHIMP_AUDIENCE_ID

ENV CF_SPACE_ID=$CF_SPACE_ID
ENV CF_DELIVERY_ACCESS_TOKEN=$CF_DELIVERY_ACCESS_TOKEN
ENV CF_PREVIEW_ACCESS_TOKEN=$CF_PREVIEW_ACCESS_TOKEN
ENV CF_ENVIRONMENT=$CF_ENVIRONMENT
ENV PATREON_ACCESS_TOKEN=$PATREON_ACCESS_TOKEN
ENV PATREON_CAMPAIGN_ID=$PATREON_CAMPAIGN_ID
ENV MAILCHIMP_AUDIENCE_ID=$MAILCHIMP_AUDIENCE_ID

RUN deluser --remove-home node && addgroup -S node -g 10000 && adduser -S -G node -u 10001 node

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER node

ENV PORT=${PORT}
EXPOSE ${PORT}

ENV NEXT_TELEMETRY_DISABLED 1

ENTRYPOINT ["tini", "--"]
CMD ["node_modules/.bin/next", "start"]
