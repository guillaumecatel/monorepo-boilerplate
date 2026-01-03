import type { PlopTypes } from '@turbo/gen'

import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('@myorg/font-package sync exports', {
    description: '🔄 Synchronize package.json exports with font files',
    prompts: [],
    actions: [
      {
        type: 'modify',
        path: 'package.json',
        transform: (content: string) => {
          const pkg = JSON.parse(content)
          const srcDir = join(__dirname, '../../src')

          const files = readdirSync(srcDir).filter((file: string) =>
            /\.(woff2?|ttf|otf|eot)$/i.test(file),
          )

          // Reset exports
          pkg.exports = {}
          pkg.publishConfig = { exports: {} }

          // Add exports for each font file
          files.forEach((file: string) => {
            const kebabKey = file
              .replace(/\.[^.]+$/, '') // Remove extension
              .replace(/([a-z])([A-Z])/g, '$1-$2') // Add dash between lowercase and uppercase
              .replace(/[\s_]+/g, '-') // Replace spaces and underscores with dashes
              .toLowerCase() // Convert to lowercase
            const ext = file.match(/\.[^.]+$/)?.[0] || ''
            pkg.exports[`./${kebabKey}${ext}`] = `./src/${file}`
            pkg.publishConfig.exports[`./${kebabKey}${ext}`] = `./dist/${file}`
          })

          // Add type declarations export
          pkg.exports['./index.d.ts'] = './src/index.d.ts'
          pkg.publishConfig.exports['./index.d.ts'] = './dist/index.d.ts'

          // Add wildcard exports
          pkg.exports['./*'] = './src/*'
          pkg.publishConfig.exports['./*'] = './dist/*'

          return JSON.stringify(pkg, null, 2) + '\n'
        },
      },
    ],
  })
}
