import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['tests/integration/setup.ts'],
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
    include: ['tests/integration/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
