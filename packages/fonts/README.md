# 🔤 Font Package

> A modern web font distribution package with TypeScript typings for asset imports. Fully monorepo-ready, generator-compatible, and exhaustively documented.

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites & Installation](#-prerequisites--installation)
- [Quickstart](#-quickstart)
- [Project Structure](#️-project-structure)
- [Available Scripts](#️-available-scripts)
- [Usage](#-usage)
- [Exports & Conventions](#-exports--conventions)
- [Turbo Generators](#-turbo-generators)
- [Testing & Quality](#-testing--quality)
- [CI/CD & Publishing](#-cicd--publishing)
- [Security & Best Practices](#-security--best-practices)
- [FAQ & Troubleshooting](#-faq--troubleshooting)
- [License](#-license)

## 🎯 Overview

This package distributes web font files (WOFF, WOFF2, TTF, OTF, EOT) and provides TypeScript declarations for asset imports in frontend projects. No JS/TS code is exported—only assets and type definitions.

> **Note:** This package is generated via the monorepo Turbo generators. Use `pnpm gen` to scaffold or sync font assets. See [Turbo Generators](#-turbo-generators).

## 🧑‍💻 Tech Stack

| Technology       | Main Purpose              |
| ---------------- | ------------------------- |
| TypeScript       | Static typing, robustness |
| pnpm             | Package manager           |
| Node.js ≥ 24     | Runtime                   |
| Turbo generators | Code scaffolding          |

## ✨ Features

- 🔤 Web font files (WOFF, WOFF2, TTF, OTF, EOT)
- 📦 Simple distribution of font assets
- 🎯 TypeScript declarations included
- 🔄 Auto-copy build process
- 🛠️ Watch mode for development

## ⚡ Prerequisites & Installation

- **Node.js** ≥ 24.0.0
- **pnpm** ≥ 10.0.0
- **nvm** recommended

```bash
# From monorepo root
nvm use
pnpm install
```

## 🚀 Quickstart

```bash
pnpm add @guillaumecatel/font-package
```

## 🗂️ Project Structure

- All font files are stored in `src/`
- TypeScript declarations in `src/index.d.ts`
- Distributed assets in `dist/`

## 🛠️ Available Scripts

- `pnpm build` — Copy fonts and types to dist/
- `pnpm dev` — Watch mode for development
- `pnpm typecheck` — Type checking
- `pnpm clean` — Remove build artifacts

## 📦 Usage

### In CSS

```css
@font-face {
  font-family: 'Inter';
  src: url('@guillaumecatel/font-package/inter-regular.woff2') format('woff2');
}
```

### In TypeScript

```typescript
import interWoff2 from '@guillaumecatel/font-package/inter-regular.woff2'
import interTtf from '@guillaumecatel/font-package/inter-regular.ttf'
```

## 📑 TypeScript Typings

The package includes:

```typescript
declare module '*.woff2'
declare module '*.woff'
declare module '*.ttf'
declare module '*.otf'
declare module '*.eot'
```

## 📦 Exports & Conventions

- All font assets are exported from `src/`
- Type declarations are included for asset imports
- No JS/TS code is exported

## ⚡ Turbo Generators

Use Turbo generators to scaffold or sync font assets:

```bash
pnpm gen font-package
```

## 🧪 Testing & Quality

- TypeScript type checks (`pnpm typecheck`)
- Asset integrity is ensured by build scripts

## 🚀 CI/CD & Publishing

- Automated code checks (check-code.yml)
- npm publishing pipeline
- SemVer versioning

## 🔒 Security & Best Practices

- Only font assets and type declarations are distributed
- No runtime code, no dependencies

## ❓ FAQ & Troubleshooting

- **Q:** How do I add a new font?
  **A:** Place the file in `src/` and update `index.d.ts` if needed.
- **Q:** Can I import fonts in JS/TS?
  **A:** Yes, via asset imports as shown above.

## 🤝 Contributing

1. Fork, clone, create a feature branch
2. `pnpm install`
3. Add your fonts in `src/`
4. Update `index.d.ts` if needed
5. Open a PR with a clear description

## 📝 License

MIT
