import base from '@resona/eslint-config'
import astro from '@resona/eslint-config-astro'
import next from '@resona/eslint-config-next'
import react from '@resona/eslint-config-react'
import storybook from '@resona/eslint-config-storybook'

/**
 * Complete ESLint configuration for root workspace
 * Includes all configs for IDE support
 *
 * Order matters: Astro LAST to ensure its parser takes precedence for .astro files
 */
const all = [
  ...base,
  ...react,
  ...next,
  ...storybook,
  // Astro LAST - critical for .astro file parsing to override other parsers
  ...astro,
]

export default all
