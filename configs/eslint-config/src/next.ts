import { reactConfig } from './react'

/**
 * ESLint configuration for Next.js applications
 * Extends React config with Next.js-specific rules
 */
export const nextConfig = [
  ...reactConfig,

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      // Next.js specific rules can be added here
    },
  },
]

/**
 * Create a Next.js ESLint configuration with tsconfigRootDir set
 * @param dirname - The directory of the package (use import.meta.dirname)
 */
export function createNextConfig(dirname: string) {
  return [
    ...nextConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: dirname,
        },
      },
    },
  ]
}

export default nextConfig
