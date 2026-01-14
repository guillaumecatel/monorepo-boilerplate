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
