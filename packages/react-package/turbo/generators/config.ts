import type { PlopTypes } from '@turbo/gen'

import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Initialize helpers
  plop.setHelper('internalTemplatePath', (templateName: string) => {
    return `../../../../turbo/generators/templates/internal/${templateName}`
  })

  plop.setGenerator('@myorg/react-package create component', {
    description: '⚛️🧪 Create a new component with test',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{pascalCase name}}.tsx',
        templateFile: '{{internalTemplatePath "react-component"}}/file.hbs',
      },
      {
        type: 'add',
        path: 'tests/{{pascalCase name}}.test.tsx',
        templateFile: '{{internalTemplatePath "react-component"}}/test.hbs',
      },
      {
        type: 'append',
        path: 'package.json',
        pattern: /"exports": {(?<insertion>)/,
        template: `    "./{{kebabCase name}}": "./src/{{pascalCase name}}.tsx",`,
      },
      {
        type: 'append',
        path: 'package.json',
        pattern: /"publishConfig": {\s*"exports": {(?<insertion>)/,
        template: `      "./{{kebabCase name}}": {
            "import": "./dist/{{pascalCase name}}.js",
            "require": "./dist/{{pascalCase name}}.cjs",
            "types": "./dist/{{pascalCase name}}.d.ts"
          },`,
      },
      {
        type: 'modify',
        path: 'package.json',
        transform: (content: string) =>
          JSON.stringify(JSON.parse(content), null, 2) + '\n',
      },
      {
        type: 'append',
        path: 'src/index.ts',
        template: `export * from './{{pascalCase name}}'\n`,
      },
    ],
  })

  plop.setGenerator('@myorg/react-package create hook', {
    description: '🪝🧪 Create a new hook with test',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the hook?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{camelCase name}}.ts',
        templateFile: '{{internalTemplatePath "react-hook"}}/file.hbs',
      },
      {
        type: 'add',
        path: 'tests/{{camelCase name}}.test.ts',
        templateFile: '{{internalTemplatePath "react-hook"}}/test.hbs',
      },
      {
        type: 'append',
        path: 'package.json',
        pattern: /"exports": {(?<insertion>)/,
        template: `    "./{{kebabCase name}}": "./src/{{camelCase name}}.ts",`,
      },
      {
        type: 'append',
        path: 'package.json',
        pattern: /"publishConfig": {\s*"exports": {(?<insertion>)/,
        template: `      "./{{kebabCase name}}": {
            "import": "./dist/{{camelCase name}}.js",
            "require": "./dist/{{camelCase name}}.cjs",
            "types": "./dist/{{camelCase name}}.d.ts"
          },`,
      },
      {
        type: 'modify',
        path: 'package.json',
        transform: (content: string) =>
          JSON.stringify(JSON.parse(content), null, 2) + '\n',
      },
      {
        type: 'append',
        path: 'src/index.ts',
        template: `export * from './{{camelCase name}}'\n`,
      },
    ],
  })

  plop.setGenerator('@myorg/react-package sync exports', {
    description:
      '🔄 Synchronize package.json exports and index.ts with src files',
    prompts: [],
    actions: [
      {
        type: 'modify',
        path: 'src/index.ts',
        transform: () => {
          const srcDir = join(__dirname, '../../src')

          const files = readdirSync(srcDir)
            .filter(
              (file: string) =>
                (file.endsWith('.ts') || file.endsWith('.tsx')) &&
                !file.endsWith('.test.ts') &&
                !file.endsWith('.test.tsx') &&
                file !== 'index.ts',
            )
            .map((file: string) => file.replace(/\.tsx?$/, ''))

          return (
            files
              .map((file: string) => `export * from './${file}'`)
              .join('\n') + '\n'
          )
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
                (file.endsWith('.ts') || file.endsWith('.tsx')) &&
                !file.endsWith('.test.ts') &&
                !file.endsWith('.test.tsx') &&
                file !== 'index.ts',
            )
            .map((file: string) => ({
              name: file.replace(/\.tsx?$/, ''),
              ext: file.endsWith('.tsx') ? '.tsx' : '.ts',
            }))

          // Reset exports
          pkg.exports = {}
          pkg.publishConfig = { exports: {} }

          // Add exports for each file
          files.forEach(({ name, ext }: { name: string; ext: string }) => {
            const kebabName = name
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase()
            pkg.exports[`./${kebabName}`] = `./src/${name}${ext}`
            pkg.publishConfig.exports[`./${kebabName}`] = {
              import: `./dist/${name}.js`,
              require: `./dist/${name}.cjs`,
              types: `./dist/${name}.d.ts`,
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
