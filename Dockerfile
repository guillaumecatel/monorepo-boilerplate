# Monorepo Docker multi-stage build
# Optimized per-app build stages for better caching and parallel builds

ARG NODE_VERSION="24"

# Stage 1: Base image with pnpm
FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# === AUTO-GENERATED BUILD STAGES BELOW ===
# Do not manually edit below this line - build stages are managed by turbo/generators

# start design-system --> build
FROM base AS design-system-build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter "design-system..." --frozen-lockfile --ignore-scripts
RUN pnpm --filter "design-system" run build
RUN pnpm deploy --filter="design-system" --prod --ignore-scripts "/prod/design-system"

# end design-system --> build

# start cms --> build
FROM base AS cms-build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter "cms..." --frozen-lockfile --ignore-scripts
RUN pnpm --filter "cms" run build
RUN pnpm deploy --filter="cms" --prod --ignore-scripts "/prod/cms"

# end cms --> build

# start website --> build
FROM base AS website-build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter "website..." --frozen-lockfile --ignore-scripts
RUN pnpm --filter "website" run build
RUN pnpm deploy --filter="website" --prod --ignore-scripts "/prod/website"

# end website --> build
# === AUTO-GENERATED RUNTIME STAGES BELOW ===
# Do not manually edit below this line - runtime stages are managed by turbo/generators

# start design-system --> runtime
FROM gcr.io/distroless/nodejs${NODE_VERSION}-debian12 AS design-system
ENV NODE_ENV=production
ENV PORT=3002

WORKDIR /prod/design-system
COPY --from=design-system-build --chown=nonroot:nonroot /prod/design-system/storybook-static ./storybook-static
COPY --from=design-system-build --chown=nonroot:nonroot /prod/design-system/node_modules ./node_modules
COPY --from=design-system-build --chown=nonroot:nonroot /prod/design-system/server.mjs ./server.mjs

USER nonroot
EXPOSE 3002

ENTRYPOINT ["/nodejs/bin/node"]
CMD ["server.mjs"]

# end design-system --> runtime

# start cms --> runtime
FROM node:${NODE_VERSION}-alpine AS cms
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

WORKDIR /prod/cms

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=cms-build --chown=nextjs:nodejs /prod/cms/.next/standalone ./
COPY --from=cms-build --chown=nextjs:nodejs /prod/cms/.next/static ./.next/static
COPY --from=cms-build --chown=nextjs:nodejs /prod/cms/node_modules ./node_modules

RUN chmod -R a-w+x /prod/cms && chmod -R a+x /prod/cms/.next /prod/cms/node_modules

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

# end cms --> runtime

# start website --> runtime
FROM gcr.io/distroless/nodejs${NODE_VERSION}-debian12 AS website
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /prod/website
COPY --from=website-build --chown=nonroot:nonroot /prod/website/dist ./dist
COPY --from=website-build --chown=nonroot:nonroot /prod/website/node_modules ./node_modules
COPY --from=website-build --chown=nonroot:nonroot /prod/website/server.mjs ./server.mjs

USER nonroot
EXPOSE 3000

ENTRYPOINT ["/nodejs/bin/node"]
CMD ["server.mjs"]

# end website --> runtime
