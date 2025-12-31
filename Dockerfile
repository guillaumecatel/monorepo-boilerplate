ARG NODE_VERSION="24"

FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# astro-website --> build
FROM base AS astro-website-build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter "astro-website..." --frozen-lockfile --ignore-scripts
RUN pnpm run build --filter "astro-website"
RUN pnpm deploy --filter "astro-website" --prod --ignore-scripts "/prod/astro-website"

# astro-website --> runtime
FROM gcr.io/distroless/nodejs${NODE_VERSION}-debian12 AS astro-website-runtime
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /prod/astro-website
COPY --from=astro-website-build --chown=nonroot:nonroot /prod/astro-website/dist ./dist
COPY --from=astro-website-build --chown=nonroot:nonroot /prod/astro-website/node_modules ./node_modules
COPY --from=astro-website-build --chown=nonroot:nonroot /prod/astro-website/server.mjs ./server.mjs

USER nonroot
EXPOSE 3000

ENTRYPOINT ["/nodejs/bin/node"]
CMD ["server.mjs"]

# storybook-react --> build
FROM base AS build-storybook-react
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter "storybook-react..." --frozen-lockfile --ignore-scripts
RUN pnpm run build --filter "storybook-react"
RUN pnpm deploy --filter "storybook-react" --prod "/prod/storybook-react"

# storybook-react --> runtime
FROM gcr.io/distroless/nodejs${NODE_VERSION}-debian12 AS storybook-react-runtime
ENV NODE_ENV=production
ENV PORT=3001

WORKDIR /prod/storybook-react
COPY --from=build-storybook-react --chown=nonroot:nonroot /prod/storybook-react/storybook-static ./storybook-static
COPY --from=build-storybook-react --chown=nonroot:nonroot /prod/storybook-react/node_modules ./node_modules
COPY --from=build-storybook-react --chown=nonroot:nonroot /prod/storybook-react/server.mjs ./server.mjs

USER nonroot
EXPOSE 3001

ENTRYPOINT ["/nodejs/bin/node"]
CMD ["server.mjs"]
