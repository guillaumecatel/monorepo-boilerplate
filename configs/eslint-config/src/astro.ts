import { includeIgnoreFile } from '@eslint/compat'
import { globalIgnores } from '@eslint/config-helpers'
import pluginAstro from 'eslint-plugin-astro'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const gitignorePath = fileURLToPath(
  new URL('../../../.gitignore', import.meta.url),
)

const tsFiles = ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']

/**
 * ESLint configuration for Astro applications
 * Uses astro plugin which already handles TypeScript parsing for .astro files
 */
export const astroConfig = [
  globalIgnores(['**/i18n/**']),
  includeIgnoreFile(gitignorePath),

  // TypeScript rules ONLY for non-Astro files
  // Must come BEFORE Astro plugin to not override its parser config
  {
    files: tsFiles,
    languageOptions: {
      parser: tseslint.parser,
      globals: { ...globals.browser, ...globals.node, ...globals.vitest },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended
        .filter((c) => c.rules)
        .reduce((acc, c) => ({ ...acc, ...c.rules }), {}),
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      '@typescript-eslint/no-unused-vars': ['error'],
      'no-unused-vars': 'off',
    },
  },

  // Astro plugin - sets up parser for .astro files with TS support
  ...pluginAstro.configs.recommended,

  // Perfectionist for imports (including .astro files)
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,astro}'],
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
    },
  },

  // Prettier - only for non-astro files to not override parser
  {
    files: tsFiles,
    plugins: { prettier: pluginPrettier },
    rules: { 'prettier/prettier': 'off' },
  },
]

/**
 * Create an Astro ESLint configuration with tsconfigRootDir set
 * @param dirname - The directory of the package (use import.meta.dirname)
 */
export function createAstroConfig(dirname: string) {
  return [
    ...astroConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: dirname,
        },
      },
    },
  ]
}

export default astroConfig
