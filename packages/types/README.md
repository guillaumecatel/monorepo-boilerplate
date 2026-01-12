# 🛠️ Typescript Package

> A modern TypeScript utility package, fully tested, automated, and monorepo-ready.

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites & Installation](#-prerequisites--installation)
- [Quickstart](#-quickstart)
- [Project Structure](#-project-structure)
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

This package provides robust, type-safe TypeScript utilities with automated exports, ESM/CJS support, and monorepo integration. Designed for professional use, easy maintenance, and extension.

> **Note:** This package is generated via the monorepo Turbo generators. Use `pnpm gen` to scaffold or sync utilities. See [Turbo Generators](#-turbo-generators).

## 🧑‍💻 Tech Stack

| Technology       | Main Purpose                  |
| ---------------- | ----------------------------- |
| TypeScript       | Static typing, robustness     |
| tsdown           | ESM/CJS build, optimal bundle |
| Vitest           | Unit testing                  |
| Turbo generators | Code scaffolding              |
| pnpm             | Package manager               |
| Node.js ≥ 24     | Runtime                       |

## ✨ Features

- 📦 ESM & CJS, fully typed
- 🧪 Unit tests with Vitest
- 🔄 Auto-generated exports (src/ & package.json)
- 🛠️ Turbo generators for scaffolding
- 🛡️ Type guards, helpers, string utils
- 🚀 Ready for CI/CD and publishing

## ⚡ Prerequisites & Installation

- **Node.js** ≥ 24.0.0
- **pnpm** ≥ 10.0.0
- **nvm** recommended

```bash
# From monorepo root
nvm use
pnpm install
```

### Install the package

```bash
pnpm add @resona/typescript-package
```

## 🚀 Quickstart

```typescript
import { isString, isNumber } from '@resona/typescript-package'
// or
import { isString } from '@resona/typescript-package/guards'
import { kebabCase } from '@resona/typescript-package/alias'

if (isString(value)) {
  console.log(value.toUpperCase())
}
```

## 📂 Project Structure

```text
typescript-package/
├── src/
│   ├── alias.ts            # String utils
│   ├── guards.ts           # Type guards
│   └── index.ts            # Entry point
├── tests/
│   ├── alias.test.ts       # Alias tests
│   └── guards.test.ts      # Guard tests
├── turbo/
│   ├── package.json        # Generator config
│   └── generators/
│       ├── config.ts       # Generator definitions
│       └── templates/      # Shared templates
├── package.json
├── tsconfig.json
├── tsconfig.test.json
├── tsdown.config.ts        # Build config
└── vitest.config.ts        # Test config
```

## 🛠️ Available Scripts

| Command             | Description                |
| ------------------- | -------------------------- |
| `pnpm dev`          | Watch mode + auto rebuild  |
| `pnpm typecheck`    | Type checking              |
| `pnpm test`         | Run all tests              |
| `pnpm test --watch` | Watch mode for tests       |
| `pnpm build`        | Production build (ESM/CJS) |
| `pnpm clean`        | Clean generated files      |

## 📦 Usage

### Type Guards (`guards.ts`)

```typescript
import {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
} from '@resona/typescript-package/guards'

if (isString(value)) {
  // TypeScript knows value is string here
}
```

### Type Utilities (`alias.ts`)

```typescript
import {
  Nullable,
  Maybe,
  Falsy,
  Primitive,
  Nullish,
} from '@resona/typescript-package/alias'

type Name = Nullable<string> // string | null
type Age = Maybe<number> // number | undefined
```

## 📤 Exports & Conventions

This package uses conditional exports for maximum compatibility:

```json
{
  "exports": {
    "./alias": "./src/alias.ts",
    "./guards": "./src/guards.ts",
    ".": "./src/index.ts"
  },
  "publishConfig": {
    "exports": {
      "./alias": {
        "import": "./dist/alias.js",
        "require": "./dist/alias.cjs",
        "types": "./dist/alias.d.ts"
      },
      "./guards": {
        "import": "./dist/guards.js",
        "require": "./dist/guards.cjs",
        "types": "./dist/guards.d.ts"
      },
      ".": {
        "import": "./dist/index.js",
        "require": "./dist/index.cjs",
        "types": "./dist/index.d.ts"
      }
    }
  }
}
```

- **Automatic sync:** Use `pnpm gen` → "sync exports" to update exports and index.
- **Convention:** Each utility has its own source and test file.

## ⚡ Turbo Generators

Generators are included to automate TypeScript file creation and export sync.

### Create a TypeScript file

```bash
# From monorepo root
pnpm turbo gen @guillaumecatel/typescript-package create typescript file
# Or from the package directory
pnpm gen
```

- Creates `src/yourFile.ts` and `tests/yourFile.test.ts`
- Updates exports in `package.json` and `src/index.ts`

### Sync exports

```bash
pnpm turbo gen @guillaumecatel/typescript-package sync exports
# or
pnpm gen
```

- Scans `src/` and updates all exports automatically.

## 🧪 Testing & Quality

Tests are written with **Vitest**:

```typescript
import { describe, expect, it } from 'vitest'
import { isString } from '@/guards'

describe('isString', () => {
  it('returns true for strings', () => {
    expect(isString('hello')).toBe(true)
  })
  it('returns false for non-strings', () => {
    expect(isString(123)).toBe(false)
  })
})
```

- **Hot reload:** `pnpm dev`
- **Coverage:** `pnpm test -- --coverage`
- **Structure:** Each utility has its own dedicated test in `tests/`

## 🚀 CI/CD & Publishing

- **CI lint/test/build:** See `.github/workflows/check-code.yml`
- **Publishing:** via pipeline or `pnpm publish --filter=@guillaumecatel/typescript-package`
- **Versioning:** Follows SemVer and monorepo guidelines.

## 🔒 Security & Best Practices

- **Type safety:** All exports are strictly typed.
- **No unnecessary dependencies:** Minimal package.
- **Exhaustive tests:** Every utility must be tested.
- **Export sync:** Mandatory before any publish.

## ❓ FAQ & Troubleshooting

- **Export issues?**
  - Run `pnpm gen` → "sync exports".
- **Tests failing?**
  - Check Node.js and pnpm version, rerun `pnpm install`.
- **Adding a utility?**
  - Use the dedicated generator, do not edit index manually.

## 📝 License

MIT
