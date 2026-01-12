import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { basename, join, resolve } from 'node:path'

export interface GeneratorAnswers {
  name: string
}

export const meta = JSON.parse(
  readFileSync(resolve(process.cwd(), 'meta.json'), 'utf-8'),
)

function getExcludedPaths(): string[] {
  const gitignorePath = resolve(process.cwd(), '.gitignore')

  if (!existsSync(gitignorePath)) {
    return ['node_modules', '.turbo', 'coverage', 'dist']
  }

  const gitignoreContent = readFileSync(gitignorePath, 'utf-8')
  return gitignoreContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.replace(/^\//, '').replace(/\/$/, ''))
}

const excludedPaths = getExcludedPaths()

function copyRecursive(src: string, dest: string): void {
  const stat = lstatSync(src)
  const name = basename(src)

  if (excludedPaths.includes(name)) {
    return
  }

  if (stat.isDirectory()) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true })
    }

    const entries = readdirSync(src)
    for (const entry of entries) {
      copyRecursive(join(src, entry), join(dest, entry))
    }
  } else {
    cpSync(src, dest)
  }
}

export function createNamePrompt(type: 'app' | 'package') {
  const folder = type === 'app' ? 'apps' : 'packages'
  return [
    {
      type: 'input' as const,
      name: 'name',
      message: type === 'app' ? "Nom de l'app:" : 'Nom du package:',
      validate: (input: string) => {
        if (!input) return 'Le nom est requis'
        if (existsSync(resolve(process.cwd(), folder, input))) {
          return `Le ${type} "${input}" existe déjà`
        }
        return true
      },
    },
  ]
}

export function createAppAction(exampleName: string) {
  return (answers: unknown) => {
    const { name } = answers as GeneratorAnswers
    const source = resolve(process.cwd(), `examples/${exampleName}`)
    const dest = resolve(process.cwd(), `apps/${name}`)
    copyRecursive(source, dest)

    const pkgPath = resolve(dest, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    pkg.name = name
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

    return `App copiée depuis examples/${exampleName} vers apps/${name}`
  }
}

export function createPackageAction(exampleName: string) {
  return (answers: unknown) => {
    const { name } = answers as GeneratorAnswers
    const source = resolve(process.cwd(), `examples/${exampleName}`)
    const dest = resolve(process.cwd(), `packages/${name}`)
    copyRecursive(source, dest)

    const pkgPath = resolve(dest, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    pkg.name = `@${meta.orgName}/${name}`
    pkg.repository = meta.repository
    pkg.author = `${meta.owner.name} <${meta.owner.email}>`
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

    return `Package copié depuis examples/${exampleName} vers packages/${name}`
  }
}
