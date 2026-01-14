import type { PlopTypes } from '@turbo/gen'

import {
  createAppAction,
  createNamePrompt,
  createPackageAction,
  deleteApp,
  getAvailableApps,
} from './utils'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Générateurs d'apps
  plop.setGenerator('create-astro-react-app', {
    description: 'Créer une nouvelle app Astro React',
    prompts: createNamePrompt('app'),
    actions: [createAppAction('app-astro-react')],
  })

  plop.setGenerator('create-payload-cms-app', {
    description: 'Créer une nouvelle app Payload CMS',
    prompts: createNamePrompt('app'),
    actions: [createAppAction('app-payload-cms')],
  })

  plop.setGenerator('create-storybook-react-app', {
    description: 'Créer une nouvelle app Storybook React',
    prompts: createNamePrompt('app'),
    actions: [createAppAction('app-storybook-react')],
  })

  // Générateurs de packages
  plop.setGenerator('create-assets-package', {
    description: "Créer un nouveau package d'assets",
    prompts: createNamePrompt('package'),
    actions: [createPackageAction('package-assets')],
  })

  plop.setGenerator('create-react-package', {
    description: 'Créer un nouveau package React',
    prompts: createNamePrompt('package'),
    actions: [createPackageAction('package-react')],
  })

  plop.setGenerator('create-typescript-package', {
    description: 'Créer un nouveau package TypeScript',
    prompts: createNamePrompt('package'),
    actions: [createPackageAction('package-typescript')],
  })

  // Générateur de suppression d'apps
  plop.setGenerator('delete-generated-app', {
    description: 'Supprimer une application existante',
    prompts: [
      {
        type: 'list',
        name: 'appName',
        message: 'Quelle application voulez-vous supprimer ?',
        choices: getAvailableApps(),
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: (answers: Record<string, unknown>) =>
          `Êtes-vous sûr de vouloir supprimer l'app "${answers.appName}" et ses stages Docker ?`,
        default: false,
      },
    ],
    actions: (answers) => {
      if (!answers || !answers.confirm) {
        return []
      }
      return [() => deleteApp(answers.appName)]
    },
  })
}
