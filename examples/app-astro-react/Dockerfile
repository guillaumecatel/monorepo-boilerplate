ARG NODE_VERSION="24"

FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# example-astro-react --> build
FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter "example-astro-react..." --frozen-lockfile --ignore-scripts
RUN pnpm --filter "example-astro-react" run build

# example-astro-react --> runtime
FROM gcr.io/distroless/nodejs${NODE_VERSION}-debian12 AS runtime
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app/examples/app-astro-react

# Copy workspace structure for module resolution
COPY --from=build --chown=nonroot:nonroot /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build --chown=nonroot:nonroot /usr/src/app/packages /usr/src/app/packages
# Copy built app
COPY --from=build --chown=nonroot:nonroot /usr/src/app/examples/app-astro-react ./

USER nonroot
EXPOSE 3000

ENTRYPOINT ["/nodejs/bin/node"]
CMD ["server.mjs"]
