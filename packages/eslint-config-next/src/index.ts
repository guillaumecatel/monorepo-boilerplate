import base from '@myorg/eslint-config'
import react from '@myorg/eslint-config-react'

const GLOB_TS = '**/*.{ts,tsx,cts,mts}'
const GLOB_JS = '**/*.{js,jsx,cjs,mjs}'

/**
 * Next.js configuration
 * Extends base and react with Next.js-specific rules
 */
const next = [
  ...base,
  ...react,
  {
    files: [GLOB_TS, GLOB_JS],
    rules: {
      // Next.js specific rules can be added here
    },
  },
]

export default next
