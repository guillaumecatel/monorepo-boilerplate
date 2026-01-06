import storybook from 'eslint-plugin-storybook'

import { reactConfig } from './react.ts'

/**
 * ESLint configuration for Storybook applications
 * Extends React config with Storybook-specific rules
 */
export const storybookConfig = [
  ...reactConfig,

  ...storybook.configs['flat/recommended'],
]

/**
 * Create a Storybook ESLint configuration with tsconfigRootDir set
 * @param dirname - The directory of the package (use import.meta.dirname)
 */
export function createStorybookConfig(dirname: string) {
  return [
    ...storybookConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: dirname,
        },
      },
    },
  ]
}

export default storybookConfig
