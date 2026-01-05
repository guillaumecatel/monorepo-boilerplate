import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
    environment: 'jsdom',
    setupFiles: ['tests/setup-tests.ts'],
    include: ['tests/int/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
