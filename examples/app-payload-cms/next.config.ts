import type { NextConfig } from 'next'

import { paraglideWebpackPlugin } from '@inlang/paraglide-js'
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: dirname,
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    webpackConfig.plugins.push(
      paraglideWebpackPlugin({
        project: '../../project.inlang',
        outdir: './src/i18n',
        strategy: ['url', 'cookie', 'baseLocale'],
      }),
    )

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
