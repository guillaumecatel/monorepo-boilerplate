import pluginReact from 'eslint-plugin-react'

import { baseConfig } from './base'

/**
 * ESLint configuration for React packages
 * Extends base config with React-specific rules
 */
export const reactConfig = [
  ...baseConfig,

  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: { react: pluginReact },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]

/**
 * Create a React ESLint configuration with tsconfigRootDir set
 * @param dirname - The directory of the package (use import.meta.dirname)
 */
export function createReactConfig(dirname: string) {
  return [
    ...reactConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: dirname,
        },
      },
    },
  ]
}

export default reactConfig
