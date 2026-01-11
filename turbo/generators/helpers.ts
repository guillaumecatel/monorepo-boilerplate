import { PlopTypes } from '@turbo/gen'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export default function initHelpers(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper('currentYear', () => new Date().getFullYear())
  plop.setHelper('currentDate', () => new Date().toISOString().split('T')[0])

  plop.setHelper('keywordsExtract', (str: string) =>
    JSON.stringify(str.split(' ').map((s) => s.trim())),
  )

  plop.setHelper(
    'organizationName',
    () => process.env.ORGANIZATION_NAME ?? 'Toto Caca',
  )

  plop.setHelper(
    'organizationEmail',
    () => process.env.ORGANIZATION_EMAIL ?? 'contact@totocaca.fr',
  )

  plop.setHelper(
    'organizationScopeName',
    () => process.env.ORGANIZATION_SCOPE_NAME ?? 'totocaca',
  )

  plop.setHelper(
    'organizationRepositoryName ',
    () => process.env.ORGANIZATION_REPOSITORY_NAME ?? 'monorepo',
  )

  plop.setHelper(
    'organizationRepositoryUrl',
    () =>
      process.env.ORGANIZATION_REPOSITORY_URL ??
      'https://github.com/guillaumecatel/monorepo',
  )

  plop.setHelper('getTemplates', (type: 'apps' | 'packages') => {
    const templatesPath = join(__dirname, 'templates', type)
    try {
      return readdirSync(templatesPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
    } catch (error) {
      console.error(`Error reading templates from ${templatesPath}:`, error)
      return []
    }
  })

  plop.setHelper('internalTemplatePath', (templateName: string) => {
    return join(__dirname, 'templates', 'internal', templateName)
  })
}
