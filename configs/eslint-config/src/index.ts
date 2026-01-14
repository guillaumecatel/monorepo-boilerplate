import { includeIgnoreFile } from '@eslint/compat'
import { globalIgnores } from '@eslint/config-helpers'
import js from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import tseslint from 'typescript-eslint'

const GLOB_TS = '**/*.{ts,tsx,cts,mts}'
const GLOB_JS = '**/*.{js,jsx,cjs,mjs}'

// Find .gitignore by traversing up from current working directory
function findGitignore(startDir: string = process.cwd()): string | null {
  let currentDir = startDir
  while (currentDir !== dirname(currentDir)) {
    const gitignorePath = join(currentDir, '.gitignore')
    if (existsSync(gitignorePath)) {
      return gitignorePath
    }
    currentDir = dirname(currentDir)
  }
  return null
}

const gitignorePath = findGitignore()

/**
 * Base TypeScript configuration
 * Includes: TypeScript, Perfectionist, Prettier, gitignore
 */
const base = [
  globalIgnores(['**/i18n/**']),
  ...(gitignorePath ? [includeIgnoreFile(gitignorePath)] : []),
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
