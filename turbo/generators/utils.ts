import { execSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'

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

  // Exclure le dossier .github (les workflows sont gérés à la racine)
  if (name === '.github') {
    return
  }

  if (stat.isDirectory()) {
    // Renommer __generators__ en generators lors de la copie
    let finalDest = dest
    if (name === '__generators__') {
      finalDest = join(dirname(dest), 'generators')
    }

    if (!existsSync(finalDest)) {
      mkdirSync(finalDest, { recursive: true })
    }

    const entries = readdirSync(src)
    for (const entry of entries) {
      copyRecursive(join(src, entry), join(finalDest, entry))
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

  // Remplacer les placeholders et ajouter les commentaires start/end
  const buildStage = `\n# start ${appName} --> build\n${cleanBuildTemplate.replaceAll('APP_NAME', appName)}\n# end ${appName} --> build\n`
  const runtimeStage = `\n# start ${appName} --> runtime\n${cleanRuntimeTemplate.replaceAll('APP_NAME', appName).replaceAll('8888', port.toString())}\n# end ${appName} --> runtime\n`

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

export function removeDockerStage(appName: string): void {
  const dockerfilePath = resolve(process.cwd(), 'Dockerfile')
  let dockerfile = readFileSync(dockerfilePath, 'utf-8')

  // Supprimer le build stage
  const buildStartMarker = `# start ${appName} --> build`
  const buildEndMarker = `# end ${appName} --> build`
  const buildStartIndex = dockerfile.indexOf(buildStartMarker)
  if (buildStartIndex !== -1) {
    const buildEndIndex = dockerfile.indexOf(buildEndMarker, buildStartIndex)
    if (buildEndIndex !== -1) {
      const endOfLine = dockerfile.indexOf('\n', buildEndIndex) + 1
      dockerfile =
        dockerfile.slice(0, buildStartIndex) + dockerfile.slice(endOfLine)
    }
  }

  // Supprimer le runtime stage
  const runtimeStartMarker = `# start ${appName} --> runtime`
  const runtimeEndMarker = `# end ${appName} --> runtime`
  const runtimeStartIndex = dockerfile.indexOf(runtimeStartMarker)
  if (runtimeStartIndex !== -1) {
    const runtimeEndIndex = dockerfile.indexOf(
      runtimeEndMarker,
      runtimeStartIndex,
    )
    if (runtimeEndIndex !== -1) {
      const endOfLine = dockerfile.indexOf('\n', runtimeEndIndex) + 1
      dockerfile =
        dockerfile.slice(0, runtimeStartIndex) + dockerfile.slice(endOfLine)
    }
  }

  writeFileSync(dockerfilePath, dockerfile)
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

    // Remplacer APP_NAME dans le générateur de l'app
    const generatorConfigPath = resolve(dest, 'turbo/generators/config.ts')
    if (existsSync(generatorConfigPath)) {
      const generatorContent = readFileSync(generatorConfigPath, 'utf-8')
      const updatedContent = generatorContent.replace(/APP_NAME/g, name)
      writeFileSync(generatorConfigPath, updatedContent)
    }

    // Ajouter le stage Docker
    const port = getNextAvailablePort()
    appendDockerStage(name, port, exampleName)

    // Copier et personnaliser le workflow GitHub Actions
    const workflowTemplatePath = resolve(
      source,
      '.github/workflows/deploy-APP_NAME.yml.template',
    )
    if (existsSync(workflowTemplatePath)) {
      const workflowDir = resolve(process.cwd(), '.github/workflows')
      if (!existsSync(workflowDir)) {
        mkdirSync(workflowDir, { recursive: true })
      }

      const workflowContent = readFileSync(workflowTemplatePath, 'utf-8')
      const updatedWorkflow = workflowContent.replaceAll('APP_NAME', name)

      const workflowDestPath = resolve(workflowDir, `deploy-${name}.yml`)
      writeFileSync(workflowDestPath, updatedWorkflow)
    }

    return `App copiée depuis examples/${exampleName} vers apps/${name} + Docker stage ajouté (port ${port}) + Workflow GitHub Actions créé`
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
    pkg.homepage = `${meta.repository.url}#readme`
    pkg.bugs = `${meta.repository.url}/issues`
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

    // Remplacer le scope dans le générateur du package
    const generatorConfigPath = resolve(dest, 'turbo/generators/config.ts')
    if (existsSync(generatorConfigPath)) {
      const generatorContent = readFileSync(generatorConfigPath, 'utf-8')
      const updatedContent = generatorContent.replace(
        /@guillaumecatel/g,
        `@${meta.orgName}`,
      )
      writeFileSync(generatorConfigPath, updatedContent)
    }

    return `Package copié depuis examples/${exampleName} vers packages/${name}`
  }
}

export function getAvailableApps(): string[] {
  const appsDir = resolve(process.cwd(), 'apps')
  if (!existsSync(appsDir)) return []
  return readdirSync(appsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

export function deleteApp(appName: string): string {
  const appPath = resolve(process.cwd(), 'apps', appName)

  if (!existsSync(appPath)) {
    return `L'app "${appName}" n'existe pas`
  }

  try {
    // Supprimer les stages Docker
    removeDockerStage(appName)

    // Supprimer le workflow GitHub Actions
    const workflowPath = resolve(
      process.cwd(),
      `.github/workflows/deploy-${appName}.yml`,
    )
    if (existsSync(workflowPath)) {
      execSync(`pnpm shx rm -f "${workflowPath}"`, {
        stdio: 'inherit',
      })
    }

    // Supprimer le dossier de l'app avec shx pour la compatibilité cross-platform
    execSync(`pnpm shx rm -rf "${appPath}"`, {
      stdio: 'inherit',
    })

    return `✓ App "${appName}", ses stages Docker et son workflow supprimés avec succès`
  } catch (error) {
    return `✗ Erreur lors de la suppression: ${error}`
  }
}
