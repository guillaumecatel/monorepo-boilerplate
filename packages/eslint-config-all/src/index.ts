import astro from '@myorg/eslint-config-astro'
import next from '@myorg/eslint-config-next'
import react from '@myorg/eslint-config-react'
import storybook from '@myorg/eslint-config-storybook'

/**
 * Complete ESLint configuration for root workspace
 * Includes all configs for IDE support
 *
 * Order matters: Astro LAST to ensure its parser takes precedence for .astro files
 */
const all = [
  ...react,
  ...next,
  ...storybook,
  // Astro LAST - critical for .astro file parsing to override other parsers
  ...astro,
]

export default all
