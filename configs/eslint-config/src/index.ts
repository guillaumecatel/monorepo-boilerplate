import { includeIgnoreFile } from '@eslint/compat'
import { globalIgnores } from '@eslint/config-helpers'
import js from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const GLOB_TS = '**/*.{ts,tsx,cts,mts}'
const GLOB_JS = '**/*.{js,jsx,cjs,mjs}'

const gitignorePath = fileURLToPath(
  new URL('../../../.gitignore', import.meta.url),
)

/**
 * Base TypeScript configuration
 * Includes: TypeScript, Perfectionist, Prettier, gitignore
 */
const base = [
  globalIgnores(['**/i18n/**']),
  includeIgnoreFile(gitignorePath),
  ...tseslint.configs.recommended,

  {
    files: [GLOB_TS, GLOB_JS],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.vitest },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
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
    files: [GLOB_TS, GLOB_JS],
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

export default base
