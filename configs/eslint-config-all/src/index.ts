import base from 'eslint-config'
import astro from 'eslint-config-astro'
import next from 'eslint-config-next'
import react from 'eslint-config-react'
import storybook from 'eslint-config-storybook'

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
