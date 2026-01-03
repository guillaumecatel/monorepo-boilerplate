import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
    environment: 'jsdom',
    setupFiles: ['tests/setup-tests.ts'],
    include: ['tests/int/**/*.test.ts'],
  },
})
