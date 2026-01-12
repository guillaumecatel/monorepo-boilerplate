# tailwind-config

Shared Tailwind CSS 4 configuration for the monorepo.

[Version française](./README_FR.md)

## Features

- 🎨 Tailwind CSS 4 base configuration
- 📦 Shareable across workspace packages and apps
- 🎯 TypeScript type definitions included
- 🔄 CSS-based configuration (no JS config file needed)

## Installation

This is an internal workspace package. Install it in your workspace packages:

```json
{
  "dependencies": {
    "tailwind-config": "workspace:*"
  },
  "peerDependencies": {
    "tailwindcss": ">=4.0.0"
  }
}
```

## Usage

### In Vite Projects

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

Then import the base configuration in your CSS:

```css
/* src/index.css */
@import 'tailwind-config';

/* Your custom styles */
@layer components {
  .btn {
    @apply rounded px-4 py-2;
  }
}
```

### In Astro Projects

```css
/* src/styles/global.css */
@import 'tailwind-config';
```

```typescript
// astro.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
})
```

### In Storybook

```css
/* .storybook/style.css */
@import 'tailwind-config';
```

## Configuration

The base configuration (`index.css`) includes:

```css
@import 'tailwindcss';

/* Base Tailwind directives */
@layer base {
  /* Custom base styles */
}

@layer components {
  /* Custom component styles */
}

@layer utilities {
  /* Custom utility classes */
}
```

## Customization

You can extend or override the configuration in your project:

```css
@import 'tailwind-config';

/* Override or extend */
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## Tailwind CSS 4 Features

This configuration uses Tailwind CSS 4, which includes:

- **CSS-first configuration** - No `tailwind.config.js` needed
- **Native cascade layers** - Better CSS specificity control
- **Improved performance** - Faster builds
- **Modern CSS features** - Container queries, `has()`, etc.
- **Better IntelliSense** - Improved editor support

## Project Structure

```text
tailwind-config/
├── index.css           # Main Tailwind configuration
├── index.d.ts          # TypeScript declarations
├── package.json
├── CHANGELOG.md
├── LICENCE.md
└── README.md
```

## TypeScript Support

The package includes type declarations for CSS imports:

```typescript
declare module 'tailwind-config' {
  const content: string
  export default content
}
```

## Versioning

This package follows semantic versioning. Check `CHANGELOG.md` for release notes.

## Available Scripts

```bash
# Clean node_modules
pnpm clean
```

## License

MIT
