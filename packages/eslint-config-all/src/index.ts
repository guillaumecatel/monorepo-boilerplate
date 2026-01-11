import base from '@guillaumecatel/eslint-config'
import astro from '@guillaumecatel/eslint-config-astro'
import next from '@guillaumecatel/eslint-config-next'
import react from '@guillaumecatel/eslint-config-react'
import storybook from '@guillaumecatel/eslint-config-storybook'

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
