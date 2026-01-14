# 🚀 Monorepo Boilerplate

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/PNPM-%3E%3D10.0.0-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.7-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/repo)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A production-ready Turborepo monorepo template designed to bootstrap new projects quickly.

## 📖 Table of Contents

- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#️-project-structure)
- [Core Features](#-core-features)
- [Environment Variables](#️-environment-variables)
- [Generators](#-generators)
- [Available Scripts](#-available-scripts)
- [Tooling & Configuration](#-tooling--configuration)
- [Docker Support](#-docker-support)
- [CI/CD](#-cicd)
- [Git Hooks](#-git-hooks)
- [Internationalization](#-internationalization)
- [Technology Stack](#-technology-stack)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

This monorepo serves as a **boilerplate** for quickly bootstrapping new Node.js projects. It provides:

- **Code generators** for creating new applications and packages
- **Example implementations** (apps & packages) demonstrating the generator outputs
- **Shared configurations** for consistent tooling across projects
- **Production-ready setup** with Docker, testing, linting, and i18n

### How It Works

1. Clone this boilerplate using `degit` (without git history)
2. Example apps and packages in `apps/` and `packages/` are automatically removed by degit
3. Use the built-in generators to create your own apps and packages
4. Start building with a solid, consistent foundation

> **Note:** The `apps/` and `packages/` directories contain example code generated from templates. They demonstrate what the generators produce and are excluded when bootstrapping a new project via degit (see [degit.json](degit.json)).

## 📋 Prerequisites

| Requirement | Version   | Notes                                      |
| ----------- | --------- | ------------------------------------------ |
| **Node.js** | >= 24.0.0 | Use nvm to manage versions                 |
| **PNPM**    | >= 10.0.0 | Required package manager                   |
| **NVM**     | Latest    | Recommended for Node.js version management |

## 🚀 Quick Start

### Bootstrap a New Project

```bash
# Clone the boilerplate without git history
pnpm dlx degit https://github.com/guillaumecatel/monorepo-boilerplate my-project

# Navigate to the project
cd my-project

# Use the correct Node.js version
nvm use

# Install dependencies
pnpm i

# Configure environment variables
cp .env.example .env
# Edit .env with your organization details

# Initialize git repository
git init

# Create your first app or package
pnpm gen
```

### Development in This Boilerplate

If you're contributing to the boilerplate itself:

```bash
# Clone with git history
git clone https://github.com/guillaumecatel/monorepo-boilerplate
cd boilerplate

# Use the correct Node.js version
nvm use

# Install dependencies
pnpm i

# Start development mode
pnpm dev
```

> **Important:** When developing or testing generators, each example app and package **must be named exactly like its template**. For example:
>
> - Template `astro-website` → App named `astro-website`
> - Template `react-package` → Package named `react-package`
>
> This naming convention ensures the `pnpm gen:apps` and `pnpm gen:packages` scripts work correctly to regenerate examples from templates.

## 🏗️ Project Structure

```text
.
├── apps/                        # Application examples (excluded by degit)
│   ├── astro-website/           # Astro SSR website example
│   └── storybook-react/         # Storybook component library example
│
├── packages/                    # Package examples (excluded by degit)
│   ├── react-package/           # React component library example
│   ├── typescript-package/      # TypeScript utilities example
│   └── font-package/            # Font distribution example
│
├── configs/                     # Shared configurations
│   ├── tailwind-config/         # Tailwind CSS 4 shared config
│   └── typescript-config/       # TypeScript base configurations
│
├── turbo/                       # Turborepo configuration
│   └── generators/              # Code generators (Plop-based)
│       ├── config.ts            # Generator definitions
│       ├── actions.ts           # Custom generator actions
│       ├── helpers.ts           # Template helpers
│       ├── validators.ts        # Input validation
│       └── templates/           # Generator templates
│           ├── apps/            # App templates
│           ├── packages/        # Package templates
│           └── internal/        # Shared base templates
│
├── translations/                # i18n translation files
│   ├── en.json                  # English translations
│   └── fr.json                  # French translations
│
├── .github/                     # GitHub configuration
│   └── workflows/               # GitHub Actions workflows
│       ├── check-code.yml       # CI: lint, test, build
│       └── deploy.yml           # CD: Docker image deployment
│
├── .husky/                      # Git hooks configuration
│   └── pre-commit               # Pre-commit hook
│
├── project.inlang/                     # Paraglide.js configuration
│   └── settings.json            # i18n settings
│
├── .env.example                 # Environment variables template
├── .nvmrc                       # Node.js version (24)
├── degit.json                   # degit configuration (excludes examples)
├── Dockerfile                   # Multi-stage Docker build
├── eslint.config.ts             # ESLint flat configuration
├── knip.ts                      # Knip configuration (unused deps)
├── package.json                 # Root package.json
├── pnpm-workspace.yaml          # PNPM workspace configuration
├── prettier.config.ts           # Prettier configuration
├── turbo.json                   # Turborepo task configuration
└── vitest.config.ts             # Vitest configuration
```

## ✨ Core Features

### Turborepo Build System

- **Parallel task execution** across all packages
- **Smart caching** for faster builds
- **Task dependencies** properly configured
- **Persistent dev mode** for all apps

### PNPM Workspaces

- **Efficient disk usage** with content-addressable storage
- **Strict peer dependencies** management
- **Workspace protocol** for local packages (`workspace:*`)
- **Auto-inject workspace packages** enabled

### TypeScript First

- **Shared TypeScript configurations** in `configs/typescript-config`
- **Strict mode** enabled by default
- **Path aliases** configured per package
- **Type checking** as a separate task

## ⚙️ Environment Variables

The generators use environment variables to customize generated code. Copy the example file and configure it:

```bash
cp .env.example .env
```

### Available Variables

| Variable                       | Description                        | Example                                      |
| ------------------------------ | ---------------------------------- | -------------------------------------------- |
| `ORGANIZATION_SCOPE_NAME`      | NPM scope for packages (without @) | `guillaumecatel`                             |
| `ORGANIZATION_NAME`            | Organization display name          | `Guillaume CATEL`                            |
| `ORGANIZATION_EMAIL`           | Contact email for package.json     | `contact@guillaumecatel.com`                 |
| `ORGANIZATION_REPOSITORY_NAME` | Repository name                    | `monorepo`                                   |
| `ORGANIZATION_REPOSITORY_URL`  | Full repository URL                | `https://github.com/electroaudiogram/resona` |

These variables are used by generators to:

- Set the `@scope` prefix for package names (e.g., `@myorg/my-package`)
- Configure `author` field in generated `package.json` files
- Set `repository` URLs in package metadata
- Generate consistent naming across all packages

## 🎨 Generators

The boilerplate includes powerful Turbo generators (Plop-based) for scaffolding new code.

### Creating an Application

```bash
pnpm gen
# Select "app"
# Choose template: astro-website | storybook-react
# Enter application name
```

| Template          | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `astro-website`   | Astro 5 SSR website with i18n, Tailwind CSS 4, security headers |
| `storybook-react` | Storybook 10 with React 19, accessibility testing, i18n stories |

### Creating a Package

```bash
pnpm gen
# Select "package"
# Choose template: react-package | typescript-package | font-package
# Enter package name
```

| Template             | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `react-package`      | React 19 component library with Vitest + Testing Library |
| `typescript-package` | Pure TypeScript utilities with ESM/CJS exports           |
| `font-package`       | Web font distribution (WOFF, WOFF2, TTF, OTF, EOT)       |

### Sub-Generators

Each generated app/package includes its own sub-generators:

```bash
# React package generators
cd packages/my-react-lib
pnpm gen
# Options: create component | create hook | sync exports

# TypeScript package generators
cd packages/my-utils
pnpm gen
# Options: create typescript file | sync exports

# Storybook generators
cd apps/my-storybook
pnpm gen
# Options: create stories
```

## 📜 Available Scripts

### Root Workspace

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm build`         | Build all packages and apps            |
| `pnpm dev`           | Start all apps in development mode     |
| `pnpm test`          | Run all tests with Vitest              |
| `pnpm typecheck`     | Type check all packages                |
| `pnpm lint`          | Lint and auto-fix with ESLint          |
| `pnpm format`        | Format code with Prettier              |
| `pnpm clean`         | Clean all build artifacts              |
| `pnpm gen`           | Run Turbo generators                   |
| `pnpm knip`          | Detect unused dependencies and exports |
| `pnpm check-updates` | Check for dependency updates           |

### Generator Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm gen:all`      | Regenerate all example apps and packages |
| `pnpm gen:apps`     | Regenerate all example apps              |
| `pnpm gen:packages` | Regenerate all example packages          |

> These scripts are useful for testing generator templates after modifications.

### Turborepo Filters

Run tasks on specific packages using `--filter`:

```bash
# Run build only on astro-website and its dependencies
pnpm build --filter=astro-website...

# Run build only on astro-website (without dependencies)
pnpm build --filter=astro-website

# Run dev on all packages in apps/
pnpm dev --filter="./apps/*"

# Run tests on all packages except storybook-react
pnpm test --filter="!storybook-react"

# Run typecheck on packages that changed since main branch
pnpm typecheck --filter="[main]"
```

| Filter Pattern     | Description                          |
| ------------------ | ------------------------------------ |
| `name`             | Exact package name                   |
| `name...`          | Package and all its dependencies     |
| `...name`          | Package and all its dependents       |
| `./path/*`         | All packages matching the path glob  |
| `!name`            | Exclude a package                    |
| `[git-ref]`        | Packages changed since git reference |
| `{./path/*}[main]` | Changed packages in path since main  |

### PNPM Workspace Commands

Run commands in specific packages:

```bash
# Run a script in a specific package
pnpm --filter=astro-website dev

# Add a dependency to a specific package
pnpm --filter=react-package add lodash

# Add a dev dependency to a specific package
pnpm --filter=react-package add -D @types/lodash

# Add a workspace package as dependency
pnpm --filter=astro-website add @myorg/react-package@workspace:*

# Run command in all packages matching pattern
pnpm --filter="@myorg/*" build

# Run command recursively in all packages
pnpm -r exec pwd
```

### Useful Turborepo Options

```bash
# Run with verbose output
pnpm build --verbosity=2

# Run without cache
pnpm build --force

# Run with specific concurrency
pnpm build --concurrency=4

# Dry run to see what would be executed
pnpm build --dry-run

# Generate task graph visualization
pnpm build --graph=graph.html

# Continue running even if a task fails
pnpm test --continue

# Run only tasks that have no cache
pnpm build --only
```

## 🔧 Tooling & Configuration

### ESLint

- **Flat config** format (`eslint.config.ts`)
- **TypeScript-aware** linting
- **React and JSX accessibility** rules
- **Astro support** for `.astro` files
- **Storybook rules** for story files
- **Perfectionist** for import/export ordering
- **Prettier integration** for consistent formatting

### Prettier

- **Tailwind CSS plugin** for class sorting
- **Astro plugin** for `.astro` files
- Configured in `prettier.config.ts`

### Knip

Detects unused code and dependencies:

```bash
pnpm knip
```

Configuration in `knip.ts` with Astro-specific patterns.

### Vitest

- **Workspace-aware** test configuration
- **Root configuration** in `vitest.config.ts`
- **Per-package configurations** for specific needs
- **Testing Library** integration for React components

## 🐳 Docker Support

The Dockerfile demonstrates multi-stage builds for production deployment:

```bash
# Build astro-website image
docker build --target astro-website-runtime -t astro-website .

# Build storybook-react image
docker build --target storybook-react-runtime -t storybook-react .

# Run containers
docker run -p 3000:3000 astro-website
docker run -p 3001:3001 storybook-react
```

### Build Stages

| Stage       | Description                        |
| ----------- | ---------------------------------- |
| `base`      | Node.js Alpine with PNPM enabled   |
| `*-build`   | Build stage with full dependencies |
| `*-runtime` | Minimal distroless runtime image   |

Features:

- **Distroless base images** for security
- **Non-root user** execution
- **pnpm deploy** for minimal production dependencies
- **Build caching** for faster rebuilds

## 🚀 CI/CD

The boilerplate includes GitHub Actions workflows demonstrating a complete CI/CD pipeline. These workflows serve as examples that you can adapt for your own projects.

### Workflows Overview

| Workflow         | Trigger                           | Purpose                |
| ---------------- | --------------------------------- | ---------------------- |
| `check-code.yml` | Push to `main`, `feature/**`, PRs | Continuous Integration |
| `deploy.yml`     | Push tag `v*`                     | Continuous Deployment  |

### Check Code (CI)

Runs on every push and pull request to ensure code quality:

```text
Steps:
  1. ⬇️  Checkout code
  2. 📦 Install PNPM & Node.js (from .nvmrc)
  3. � Restore Turborepo cache
  4. 📥 Install dependencies
  5. ✅ Security audit (pnpm audit)
  6. 🧹 Unused code detection (knip)
  7. 💅 Lint (ESLint)
  8. 🧼 Format check (Prettier)
  9. 🚨 Type check (TypeScript)
  10. 🧪 Unit tests (Vitest with coverage)
  11. 🏗️  Build all packages
```

**Features:**

- **Concurrency control** - Cancels duplicate runs on the same branch
- **Turborepo cache** - Caches `.turbo` folder for faster subsequent builds
- **Auto PNPM version** - Uses version from `packageManager` field in package.json

### Deploy (CD)

Triggered when pushing a version tag (e.g., `v1.0.0`):

```text
Steps:
  1. 🔍 Verify tag is on main branch
  2. 🔍 Verify main branch CI is green
  3. 🏗️  Build & push Docker images (parallel matrix)
```

**Features:**

- **Concurrency control** - Prevents parallel deployments
- **Tag verification** - Ensures tag is on the main branch
- **CI status check** - Only deploys if latest CI on main passed
- **Matrix strategy** - Builds apps in parallel (astro-website, storybook-react)
- **Version tags** - Images tagged with both `latest` and version (e.g., `v1.0.0`)
- **Scoped Docker cache** - Separate cache per app for faster builds

### Creating a Release

```bash
# Create and push a version tag to trigger deployment
git tag v1.0.0
git push origin v1.0.0

# Or create an annotated tag with message
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Docker Images Registry

Images are pushed to GitHub Container Registry with version tags:

```text
ghcr.io/<owner>/<repo>-astro-website:latest
ghcr.io/<owner>/<repo>-astro-website:v1.0.0

ghcr.io/<owner>/<repo>-storybook-react:latest
ghcr.io/<owner>/<repo>-storybook-react:v1.0.0
```

### Customizing for Your Project

When bootstrapping a new project:

1. **Update workflow triggers** - Adjust branch patterns if needed
2. **Add/remove build targets** - Modify Docker build steps for your apps
3. **Configure secrets** - `GITHUB_TOKEN` is automatic, add others as needed
4. **Adjust Node.js version** - Automatically read from `.nvmrc`

> **Note:** The example workflows build Docker images for the example apps (`astro-website`, `storybook-react`). After bootstrapping, update the workflows to build your own applications.

## 🪝 Git Hooks

Git hooks are managed with **Husky** and **lint-staged** in `.husky/`:

### Pre-commit Hook

Runs automatically before each commit on staged files only:

1. **ESLint** - Lint and auto-fix `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`, `.astro` files
2. **Prettier** - Format all staged files

```bash
# .husky/pre-commit
pnpm lint-staged
```

**Configuration in `package.json`:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs,astro}": ["eslint --fix"],
    "*": ["prettier --write --ignore-unknown"]
  }
}
```

**Features:**

- **Only staged files** - Fast, doesn't touch unrelated files
- **Auto-rollback** - Reverts changes if any task fails
- **Parallel execution** - Runs tasks in parallel for speed

## 🌍 Internationalization

i18n is powered by **Paraglide.js** from the inlang ecosystem.

### Configuration

- **Settings:** `project.inlang/settings.json`
- **Translations:** `translations/{locale}.json`
- **Base locale:** French (`fr`)
- **Supported locales:** French (`fr`), English (`en`)

### Translation Files

```text
translations/
├── en.json    # English translations
└── fr.json    # French translations
```

### Usage in Apps

Each app integrates Paraglide.js for type-safe translations. See individual app READMEs for specific implementation details.

## 🔧 Technology Stack

### Core Infrastructure

| Tool                                          | Purpose               | Why This Choice                                                                                                                          |
| --------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Turborepo](https://turbo.build/repo)         | Monorepo build system | Optimized for JS/TS monorepos with intelligent caching, parallel execution, and minimal configuration. Faster than Nx for simple setups. |
| [PNPM](https://pnpm.io/)                      | Package manager       | 3x faster than npm, strict dependency resolution, content-addressable storage saves disk space, native workspace support.                |
| [TypeScript](https://www.typescriptlang.org/) | Type safety           | Catches errors at compile time, enables IDE autocompletion, self-documenting code, essential for large codebases.                        |
| [Node.js 24](https://nodejs.org/)             | Runtime               | LTS version with native ESM support, improved performance, and modern JavaScript features.                                               |

### Code Quality

| Tool                                       | Purpose               | Why This Choice                                                                                                |
| ------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| [ESLint](https://eslint.org/)              | Linting               | Industry standard, highly configurable, flat config for better performance, extensive plugin ecosystem.        |
| [Prettier](https://prettier.io/)           | Code formatting       | Opinionated formatter eliminates style debates, integrates with ESLint, supports all project file types.       |
| [Knip](https://knip.dev/)                  | Unused code detection | Keeps codebase clean by detecting dead code, unused dependencies, and orphaned files. Essential for monorepos. |
| [Husky](https://typicode.github.io/husky/) | Git hooks             | Zero-dependency, easy setup, ensures code quality before commits reach the repository.                         |

### Testing

| Tool                                            | Purpose           | Why This Choice                                                                                           |
| ----------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| [Vitest](https://vitest.dev/)                   | Unit testing      | Native ESM support, Vite-powered for speed, Jest-compatible API, built-in TypeScript support, watch mode. |
| [Testing Library](https://testing-library.com/) | Component testing | Tests components as users interact with them, promotes accessibility, framework-agnostic patterns.        |

### Frontend Frameworks

| Tool                                       | Purpose               | Why This Choice                                                                                                      |
| ------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [Astro](https://astro.build/)              | Web framework         | Zero JS by default for performance, island architecture, SSR/SSG flexibility, excellent DX with content collections. |
| [React 19](https://react.dev/)             | UI library            | Largest ecosystem, concurrent features, Server Components ready, industry standard for component libraries.          |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling               | CSS-first configuration, no runtime overhead, excellent DX with VS Code extension, design system in CSS.             |
| [Storybook 10](https://storybook.js.org/)  | Component development | Isolated component development, visual testing, documentation generation, accessibility testing built-in.            |

### Build Tools

| Tool                                 | Purpose              | Why This Choice                                                                                 |
| ------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------- |
| [tsdown](https://tsdown.vercel.app/) | TypeScript bundler   | Built on esbuild for speed, simple configuration, automatic dual ESM/CJS output, tree-shaking.  |
| [Vite](https://vitejs.dev/)          | Dev server & bundler | Instant HMR, native ESM dev server, Rollup-based production builds, extensive plugin ecosystem. |
| [Docker](https://www.docker.com/)    | Containerization     | Reproducible builds, distroless images for security, multi-stage builds for minimal image size. |

### Internationalization

| Tool                                                       | Purpose        | Why This Choice                                                                                                    |
| ---------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Paraglide.js](https://inlang.com/m/gerre34r/paraglide-js) | Type-safe i18n | Compile-time translations, fully typed message functions, tiny runtime (~1kb), tree-shakeable, no runtime parsing. |

## 🆘 Troubleshooting

### Common Issues

#### Node.js version mismatch

```bash
# Error: The engine "node" is incompatible with this module
nvm use # Use the version specified in .nvmrc
```

#### PNPM not found or wrong version

```bash
# Install PNPM globally
corepack enable
corepack prepare pnpm@latest --activate

# Or install specific version
npm install -g pnpm@10.25.0
```

#### Dependencies not installing correctly

```bash
# Clear PNPM cache and reinstall
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Turbo cache issues

```bash
# Clear Turborepo cache
pnpm clean
rm -rf .turbo
pnpm build --force
```

#### Generator not finding templates

```bash
# Ensure you're running from the correct directory
# Root generators:
pnpm gen # From monorepo root

# Package-specific generators:
cd packages/my-package
pnpm gen # From package directory
```

#### Docker build fails

```bash
# Ensure Docker is running
docker info

# Build with no cache if issues persist
docker build --no-cache --target astro-website-runtime -t astro-website .
```

#### Husky hooks not running

```bash
# Reinstall Husky hooks
pnpm prepare

# Or manually install
npx husky install
```

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/guillaumecatel/monorepo-boilerplate/issues)
2. Search existing issues before creating a new one
3. Provide your Node.js version, PNPM version, and OS when reporting

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/guillaumecatel/monorepo-boilerplate.git
cd monorepo-boilerplate

# Install dependencies
nvm use
pnpm install

# Create a feature branch
git checkout -b feature/my-feature
```

### Guidelines

1. **Follow existing code style** - ESLint and Prettier are configured
2. **Write tests** - Add tests for new functionality
3. **Update documentation** - Keep README and inline docs current
4. **Use conventional commits** - Follow the commit message format:
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `chore:` Maintenance tasks
   - `refactor:` Code refactoring
   - `test:` Test additions or fixes

### Pull Request Process

1. Ensure all checks pass (`pnpm lint`, `pnpm test`, `pnpm typecheck`)
2. Update the README if you've added new features
3. Test generator templates by running `pnpm gen:all`
4. Submit a PR with a clear description of changes

### Updating Generator Templates

When modifying templates in `turbo/generators/templates`:

```bash
# Test by regenerating all examples
pnpm gen:all

# Verify everything still works
pnpm build
pnpm test
pnpm typecheck
```

## 📝 License

MIT
