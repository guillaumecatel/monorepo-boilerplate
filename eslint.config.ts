import { globalIgnores } from '@eslint/config-helpers'
import { createBaseConfig } from '@myorg/eslint-config/base'

export default [
  globalIgnores([
    '.husky/**',
    'pnpm-lock.yaml',
    'apps/**',
    'packages/**',
    'configs/**',
  ]),
  ...createBaseConfig(import.meta.dirname),
]
