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

# === AUTO-GENERATED RUNTIME STAGES BELOW ===
# Do not manually edit below this line - runtime stages are managed by turbo/generators
