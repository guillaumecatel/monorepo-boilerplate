import { PlopTypes } from '@turbo/gen'
import { exec } from 'node:child_process'
import { existsSync, unlinkSync } from 'node:fs'
import path from 'node:path'

import { InstallDepsActionData } from './types'

export default function initActions(plop: PlopTypes.NodePlopAPI): void {
  plop.setActionType('installDeps', async (answers) => {
    const { packagePath, packages } = answers as InstallDepsActionData
    return new Promise((resolve, reject) => {
      console.log(`📦 Installing dependencies...`)

      const command =
        packages.length === 0
          ? 'pnpm install'
          : `pnpm add ${packages.join(' ')} --filter=${path.basename(packagePath)}`

      exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Erreur lors de l’installation :', error.message)
          reject(error)
          return
        }
        if (stderr) console.error(stderr)
        console.log(stdout)
        resolve(`✅ Dependencies installed successfully`)
      })
    })
  })

  plop.setActionType('removeGitkeep', async () => {
    const gitkeepPath = path.resolve('packages/.gitkeep')
    if (existsSync(gitkeepPath)) {
      try {
        unlinkSync(gitkeepPath)
        return '✅ Removed .gitkeep from packages directory'
      } catch (error) {
        console.error('❌ Error removing .gitkeep:', error)
        throw error
      }
    }
    return 'ℹ️  No .gitkeep file found in packages directory'
  })
}
