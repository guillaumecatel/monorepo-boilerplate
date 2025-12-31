import { APP_TEMPLATES, PACKAGE_TEMPLATES } from './constants'

export type PackageTemplate = (typeof PACKAGE_TEMPLATES)[number]

export type AppTemplate = (typeof APP_TEMPLATES)[number]

export type PromptData<T = PackageTemplate | AppTemplate> = {
  template: T
  name: string
  description?: string
  packages: string[]
}

export type InstallDepsActionData = {
  packagePath: string
  packages: string[]
}
