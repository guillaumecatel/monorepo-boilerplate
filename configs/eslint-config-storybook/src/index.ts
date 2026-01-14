import base from 'eslint-config'
import react from 'eslint-config-react'
import storybookPlugin from 'eslint-plugin-storybook'

/**
 * Storybook configuration
 * Extends base and react with Storybook-specific rules
 */
const storybook = [
  ...base,
  ...react,
  ...storybookPlugin.configs['flat/recommended'],
]

export default storybook
