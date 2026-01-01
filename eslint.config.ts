import { includeIgnoreFile } from '@eslint/compat'
import { ConfigWithExtendsArray } from '@eslint/config-helpers'
import css from '@eslint/css'
import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import nextVitals from 'eslint-config-next/core-web-vitals'
import pluginAstro from 'eslint-plugin-astro'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import storybook from 'eslint-plugin-storybook'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import { tailwind4 } from 'tailwind-csstree'
import tseslint from 'typescript-eslint'

export type Config = Partial<
  Record<
    'astro' | 'css' | 'json' | 'markdown' | 'next' | 'prettier' | 'react',
    boolean
  >
>

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const config = (config: Config) => {
  const defaultConfig: ConfigWithExtendsArray = [
    globalIgnores([
      './.husky/**',
      'pnpm-lock.yaml',
      '**/i18n/**',
      '**/migrations/**',
    ]),
    includeIgnoreFile(gitignorePath),

    tseslint.configs.recommended,
    storybook.configs['flat/recommended'],

    {
      extends: ['js/recommended'],
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      languageOptions: {
        globals: { ...globals.browser, ...globals.node, ...globals.vitest },
      },
      plugins: { js },
      rules: {
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
  ]

  if (config.next) {
    defaultConfig.push({
      extends: nextVitals,
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      plugins: { js },
    })
  }

  if (config.react) {
    defaultConfig.push({
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: { react: pluginReact },
    })
  }

  if (config.astro) {
    defaultConfig.push({
      extends: ['astro/recommended', 'astro/jsx-a11y-recommended'],
      files: ['**/*.astro'],
      plugins: { astro: pluginAstro },
    })
  }

  if (config.json) {
    defaultConfig.push({
      extends: ['json/recommended'],
      files: ['**/*.json'],
      language: 'json/json',
      plugins: { json },
    })

    defaultConfig.push({
      extends: ['json/recommended'],
      files: ['**/*.jsonc'],
      language: 'json/jsonc',
      plugins: { json },
    })
    defaultConfig.push({
      extends: ['json/recommended'],
      files: ['**/*.json5'],
      language: 'json/json5',
      plugins: { json },
    })
  }

  if (config.markdown) {
    defaultConfig.push({
      extends: ['markdown/recommended'],
      files: ['**/*.md'],
      language: 'markdown/gfm',
      plugins: { markdown },
    })
  }

  if (config.css) {
    defaultConfig.push({
      files: ['**/*.css'],
      ignores: ['**/global.css'],
      language: 'css/css',
      languageOptions: {
        customSyntax: tailwind4,
      },
      plugins: { css },
      rules: {
        'css/no-empty-blocks': 'off',
        'css/no-invalid-at-rules': 'off',
        'css/no-unknown-at-rules': 'off',
      },
    })
  }

  if (config.prettier) {
    defaultConfig.push({
      plugins: { prettier: pluginPrettier },
      rules: { 'prettier/prettier': 'off' },
    })
  }

  return defineConfig(defaultConfig)
}

export default config({
  astro: true,
  next: true,
  css: false,
  json: true,
  markdown: true,
  prettier: true,
  react: true,
})
