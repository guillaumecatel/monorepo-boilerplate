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

  // Exclure les templates Docker (ils restent dans examples/)
  if (name === 'Dockerfile.build' || name === 'Dockerfile.runtime') {
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

function appendDockerStage(
  appName: string,
  port: number,
  exampleName: string,
): void {
  const dockerfilePath = resolve(process.cwd(), 'Dockerfile')
  const dockerfile = readFileSync(dockerfilePath, 'utf-8')
  const exampleDir = resolve(process.cwd(), 'examples', exampleName)

  // Lire les templates Dockerfile.build et Dockerfile.runtime
  const buildTemplatePath = join(exampleDir, 'Dockerfile.build')
  const runtimeTemplatePath = join(exampleDir, 'Dockerfile.runtime')

  if (!existsSync(buildTemplatePath) || !existsSync(runtimeTemplatePath)) {
    throw new Error(
      `Dockerfile.build ou Dockerfile.runtime manquant dans examples/${exampleName}`,
    )
  }

  const buildTemplate = readFileSync(buildTemplatePath, 'utf-8')
  const runtimeTemplate = readFileSync(runtimeTemplatePath, 'utf-8')

  // Supprimer les commentaires d'en-tête des templates (3 premières lignes)
  const cleanBuildTemplate = buildTemplate.split('\n').slice(3).join('\n')
  const cleanRuntimeTemplate = runtimeTemplate.split('\n').slice(3).join('\n')

  // Remplacer les placeholders et ajouter un commentaire d'identification
  const buildStage = `\n# ${appName} --> build\n${cleanBuildTemplate.replaceAll('APP_NAME', appName)}\n`
  const runtimeStage = `\n# ${appName} --> runtime\n${cleanRuntimeTemplate.replaceAll('APP_NAME', appName).replaceAll('8888', port.toString())}\n`

  // Insérer le build stage
  const buildMarker = '# === AUTO-GENERATED BUILD STAGES BELOW ==='
  const buildMarkerIndex = dockerfile.indexOf(buildMarker)
  if (buildMarkerIndex === -1) {
    throw new Error(`Marker "${buildMarker}" not found in Dockerfile`)
  }

  const buildMarkerEnd = buildMarkerIndex + buildMarker.length
  const afterBuildComment =
    dockerfile.indexOf('\n', dockerfile.indexOf('\n', buildMarkerEnd) + 1) + 1

  let newDockerfile =
    dockerfile.slice(0, afterBuildComment) +
    buildStage +
    dockerfile.slice(afterBuildComment)

  // Insérer le runtime stage
  const runtimeMarker = '# === AUTO-GENERATED RUNTIME STAGES BELOW ==='
  const runtimeMarkerIndex = newDockerfile.indexOf(runtimeMarker)
  if (runtimeMarkerIndex === -1) {
    throw new Error(`Marker "${runtimeMarker}" not found in Dockerfile`)
  }

  const runtimeMarkerEnd = runtimeMarkerIndex + runtimeMarker.length
  const afterRuntimeMarker =
    newDockerfile.indexOf(
      '\n',
      newDockerfile.indexOf('\n', runtimeMarkerEnd) + 1,
    ) + 1

  newDockerfile =
    newDockerfile.slice(0, afterRuntimeMarker) +
    runtimeStage +
    newDockerfile.slice(afterRuntimeMarker)

  writeFileSync(dockerfilePath, newDockerfile)
}

function getNextAvailablePort(): number {
  const dockerfilePath = resolve(process.cwd(), 'Dockerfile')
  const dockerfile = readFileSync(dockerfilePath, 'utf-8')
  const portMatches = dockerfile.matchAll(/EXPOSE (\d+)/g)
  const ports = Array.from(portMatches).map((m) => parseInt(m[1], 10))
  return ports.length > 0 ? Math.max(...ports) + 1 : 3000
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

    // Ajouter le stage Docker
    const port = getNextAvailablePort()
    appendDockerStage(name, port, exampleName)

    return `App copiée depuis examples/${exampleName} vers apps/${name} + Docker stage ajouté (port ${port})`
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
