import { includeIgnoreFile } from '@eslint/compat'
import { globalIgnores } from '@eslint/config-helpers'
import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const gitignorePath = fileURLToPath(
  new URL('../../../.gitignore', import.meta.url),
)

/**
 * Core TypeScript configuration without JSON/Markdown
 * Used as foundation for all configs
 */
export const coreConfig = [
  globalIgnores(['**/i18n/**']),
  includeIgnoreFile(gitignorePath),
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.vitest },
    },
    plugins: { js },
    rules: {
      ...js.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      '@typescript-eslint/no-unused-vars': ['error'],
      'no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
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

  {
    plugins: { prettier: pluginPrettier },
    rules: { 'prettier/prettier': 'off' },
  },
]

/**
 * JSON and Markdown linting configuration
 */
export const jsonMarkdownConfig = [
  {
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', '**/pnpm-lock.yaml'],
    language: 'json/json',
    plugins: { json },
    rules: json.configs.recommended.rules,
  },

  {
    files: ['**/*.jsonc', '**/tsconfig.json', '**/tsconfig.*.json'],
    language: 'json/jsonc',
    plugins: { json },
    rules: json.configs.recommended.rules,
  },

  {
    files: ['**/*.json5'],
    language: 'json/json5',
    plugins: { json },
    rules: json.configs.recommended.rules,
  },

  {
    files: ['**/*.md'],
    language: 'markdown/gfm',
    plugins: { markdown },
    rules: markdown.configs.recommended[0].rules,
  },
]

/**
 * Base ESLint configuration for all packages
 * Includes: TypeScript, JSON, Markdown, Perfectionist, Prettier
 */
export const baseConfig = [...coreConfig, ...jsonMarkdownConfig]

/**
 * Create a base ESLint configuration with tsconfigRootDir set
 * @param dirname - The directory of the package (use import.meta.dirname)
 */
export function createBaseConfig(dirname: string) {
  return [
    ...baseConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: dirname,
        },
      },
    },
  ]
}

export default baseConfig
