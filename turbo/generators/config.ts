import type { PlopTypes } from '@turbo/gen'

import { createAppAction, createNamePrompt, createPackageAction } from './utils'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Générateurs d'apps
  plop.setGenerator('app-astro-react', {
    description: 'Créer une nouvelle app Astro React',
    prompts: createNamePrompt('app'),
    actions: [createAppAction('app-astro-react')],
  })

  plop.setGenerator('app-payload-cms', {
    description: 'Créer une nouvelle app Payload CMS',
    prompts: createNamePrompt('app'),
    actions: [createAppAction('app-payload-cms')],
  })

  plop.setGenerator('app-storybook-react', {
    description: 'Créer une nouvelle app Storybook React',
    prompts: createNamePrompt('app'),
    actions: [createAppAction('app-storybook-react')],
  })

  // Générateurs de packages
  plop.setGenerator('package-assets', {
    description: "Créer un nouveau package d'assets",
    prompts: createNamePrompt('package'),
    actions: [createPackageAction('package-assets')],
  })

  plop.setGenerator('package-react', {
    description: 'Créer un nouveau package React',
    prompts: createNamePrompt('package'),
    actions: [createPackageAction('package-react')],
  })

  plop.setGenerator('package-typescript', {
    description: 'Créer un nouveau package TypeScript',
    prompts: createNamePrompt('package'),
    actions: [createPackageAction('package-typescript')],
  })
}
