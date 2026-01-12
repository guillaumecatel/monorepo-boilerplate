import node from '@astrojs/node'
import react from '@astrojs/react'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import playformCompress from '@playform/compress'
import tailwindcss from '@tailwindcss/vite'
import compressor from 'astro-compressor'
import { defineConfig } from 'astro/config'

import routes from './routes'

export default defineConfig({
  trailingSlash: 'never',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), playformCompress({}), compressor()],
  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
      // @ts-ignore
      paraglideVitePlugin({
        project: '../../.inlang',
        outdir: './src/i18n',
        strategy: ['url', 'preferredLanguage'],
        urlPatterns: routes,
      }),
    ],
  },
})
