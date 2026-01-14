import { getViteConfig } from 'astro/config'
import path from 'node:path'

export default getViteConfig({
  // @ts-expect-error: Missing types for Vitest config in Astro's getViteConfig
  test: {
    globals: true,
    setupFiles: ['tests/integration/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**'],
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.astro'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
