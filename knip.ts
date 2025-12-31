import { type KnipConfig } from 'knip'

const config: KnipConfig = {
  rules: {
    duplicates: 'off',
  },
  astro: {
    config: ['astro.config.{js,cjs,mjs,ts,mts}'],
    entry: [
      'src/content/config.ts',
      'src/content.config.ts',
      'src/pages/**/*.{astro,ts}',
      'src/content/**/*.mdx',
      'src/middleware.{js,ts}',
      'src/middleware/**/*.{js,ts}',
      'src/actions/index.{js,ts}',
    ],
    project: ['src/**/*'],
  },
  ignore: [
    'build/**',
    'dist/**',
    '**/i18n/**',
    '**/turbo/**',
    '**/vitest.shims.d.ts',
  ],
  ignoreUnresolved: [/i18n\//, /\.storybook\/i18n\//],
  ignoreDependencies: [
    'eslint-plugin-jsx-a11y',
    '@typescript-eslint/parser',
    '@turbo/gen',
    'playwright',
    '@vitest/coverage-v8',
  ],
}

export default config
