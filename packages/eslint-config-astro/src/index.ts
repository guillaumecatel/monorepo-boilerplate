import base from '@guillaumecatel/eslint-config'
import * as parserTs from '@typescript-eslint/parser'
import pluginAstro from 'eslint-plugin-astro'

const GLOB_ASTRO = '**/*.astro'
/**
 * Astro configuration
 * Extends base with Astro-specific rules
 */
const astro = [
  ...base,
  // Astro plugin - sets up parser for .astro files with TS support
  ...pluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: parserTs,
        extraFileExtensions: [GLOB_ASTRO],
      },
    },
  },
]

export default astro
