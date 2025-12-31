import type { PlopTypes } from '@turbo/gen'

import type {
  AppTemplate,
  InstallDepsActionData,
  PackageTemplate,
  PromptData,
} from './types'

import initActions from './actions'
import initHelpers from './helpers'
import { validateName } from './validators'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  initHelpers(plop)
  initActions(plop)

  plop.setGenerator('app', {
    description: '💻 Create a new application inside project',
    prompts: [
      {
        type: 'list',
        name: 'template',
        message: 'Choose an application template',
        choices: plop.getHelper('getTemplates')('apps'),
      },
      {
        type: 'input',
        name: 'name',
        message: 'Choose an application name',
        validate: (input) => validateName(input, 'Name'),
      },
    ],
    actions: (answers) => {
      const actions: PlopTypes.ActionType[] = []
      const { name, template, packages } = answers as PromptData<AppTemplate>

      // copy template files
      actions.push({
        type: 'addMany',
        base: `templates/apps/${template}`,
        destination: `apps/${plop.getHelper('kebabCase')(name)}`,
        templateFiles: [`templates/apps/${template}/**`],
        globOptions: { dot: true },
      })

      // install dependencies
      actions.push({
        type: 'installDeps',
        data: {
          packagePath: `apps/${plop.getHelper('kebabCase')(name)}`,
          packageName: plop.getHelper('kebabCase')(name),
          packages: packages || [],
        } as InstallDepsActionData,
      })

      return actions
    },
  })

  plop.setGenerator('package', {
    description: '📦 Create a new package',
    prompts: [
      {
        type: 'list',
        name: 'template',
        message: 'Choose a package template',
        choices: plop.getHelper('getTemplates')('packages'),
      },
      {
        type: 'input',
        name: 'name',
        message: 'Choose a package name',
        validate: (input) => validateName(input, 'Name'),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Set a description (optional)',
      },
    ],

    actions: (answers) => {
      const actions: PlopTypes.ActionType[] = []
      const { name, template, packages } =
        answers as PromptData<PackageTemplate>

      // copy base files
      actions.push({
        type: 'addMany',
        base: `templates/internal/base`,
        destination: `packages/${plop.getHelper('kebabCase')(name)}`,
        templateFiles: [`templates/internal/base/**`],
        data: { dir: 'packages' },
      })

      // copy templates files
      actions.push({
        type: 'addMany',
        base: `templates/packages/${template}`,
        destination: `packages/${plop.getHelper('kebabCase')(name)}`,
        templateFiles: [`templates/packages/${template}/**`],
      })

      // install deps
      actions.push({
        type: 'installDeps',
        data: {
          packagePath: `packages/${plop.getHelper('kebabCase')(name)}`,
          packages: packages || [],
        } as InstallDepsActionData,
      })

      return actions
    },
  })
}
