import { includeIgnoreFile } from '@eslint/compat'
import { ConfigWithExtendsArray, globalIgnores } from '@eslint/config-helpers'
import { fileURLToPath } from 'node:url'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default [
  globalIgnores(['./.husky/**', 'pnpm-lock.yaml', '**/i18n/**']),
  includeIgnoreFile(gitignorePath),
] as ConfigWithExtendsArray
