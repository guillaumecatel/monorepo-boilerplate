import type { PlopTypes } from '@turbo/gen'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Initialize helpers
  plop.setHelper('internalTemplatePath', (templateName: string) => {
    return `../../../../turbo/generators/templates/internal/${templateName}`
  })

  plop.setGenerator('@myorg/typescript-package create file', {
    description: '📝🧪 Create a new file with test',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the file?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{kebabCase name}}.ts',
        templateFile: '{{internalTemplatePath "typescript-file"}}/file.hbs',
      },
      {
        type: 'add',
        path: 'tests/{{kebabCase name}}.test.ts',
        templateFile: '{{internalTemplatePath "typescript-file"}}/test.hbs',
      },
      {
        type: "append",
        path: "package.json",
        pattern: /"exports": {(?<insertion>)/,
        template: `    "./{{kebabCase name}}": "./src/{{kebabCase name}}.ts",`,
      },
      {
        type: "append",
        path: "package.json",
        pattern: /"publishConfig": {\s*"exports": {(?<insertion>)/,
        template: `      "./{{kebabCase name}}": {
            "import": "./dist/{{kebabCase name}}.js",
            "require": "./dist/{{kebabCase name}}.cjs",
            "types": "./dist/{{kebabCase name}}.d.ts"
          },`,
      },
      {
        type: "modify",
        path: "package.json",
        transform: (content: string) =>
          JSON.stringify(JSON.parse(content), null, 2) + "\n",
      },
    ],
  })

  plop.setGenerator('@myorg/typescript-package sync exports', {
    description: '🔄 Synchronize package.json exports and index.ts with src files',
    prompts: [],
    actions: [
      {
        type: 'modify',
        path: 'src/index.ts',
        transform: () => {
          const srcDir = join(__dirname, '../../src')

          const files = readdirSync(srcDir)
            .filter((file: string) =>
              file.endsWith('.ts') &&
              !file.endsWith('.test.ts') &&
              file !== 'index.ts'
            )
            .map((file: string) => file.replace('.ts', ''))

          return files.map((file: string) => `export * from './${file}'`).join('\n') + '\n'
        },
      },
      {
        type: 'modify',
        path: 'package.json',
        transform: (content: string) => {
          const pkg = JSON.parse(content)
          const srcDir = join(__dirname, '../../src')

          const files = readdirSync(srcDir)
            .filter(
              (file: string) =>
                file.endsWith('.ts') &&
                !file.endsWith('.test.ts') &&
                file !== 'index.ts',
            )
            .map((file: string) => file.replace('.ts', ''))

          // Reset exports
          pkg.exports = {}
          pkg.publishConfig = { exports: {} }

          // Add exports for each file
          files.forEach((file: string) => {
            const kebabName = file.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
            pkg.exports[`./${kebabName}`] = `./src/${file}.ts`
            pkg.publishConfig.exports[`./${kebabName}`] = {
              import: `./dist/${file}.js`,
              require: `./dist/${file}.cjs`,
              types: `./dist/${file}.d.ts`,
            }
          })

          // Add main export
          pkg.exports['.'] = './src/index.ts'
          pkg.publishConfig.exports['.'] = {
            import: './dist/*.js',
            require: './dist/*.cjs',
            types: './dist/*.d.ts',
          }

          return JSON.stringify(pkg, null, 2) + '\n'
        },
      },
    ],
  })
}
