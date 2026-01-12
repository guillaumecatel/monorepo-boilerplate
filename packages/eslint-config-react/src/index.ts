import base from '@resona/eslint-config'
import pluginReact from 'eslint-plugin-react'

const GLOB_TS = '**/*.{ts,tsx,cts,mts}'

/**
 * React configuration
 * Extends base with React-specific rules
 */
const react = [
  ...base,
  {
    files: [GLOB_TS],
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

export default react
