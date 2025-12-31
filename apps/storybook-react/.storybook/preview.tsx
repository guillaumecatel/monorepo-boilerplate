import type { Preview } from '@storybook/react-vite'

import withTranslations from './decorators/withTranslations'
import { baseLocale } from './i18n/runtime'
import './style.css'

export const availableLocales = [
  { code: 'en', endonym: 'English', emoji: '🇺🇸', dir: 'ltr' },
  { code: 'fr', endonym: 'Français', emoji: '🇫🇷', dir: 'ltr' },
]

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Global language for components',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: availableLocales.map((locale) => {
          return {
            value: locale.code,
            title: locale.endonym,
            right: locale.emoji,
          }
        }),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: baseLocale,
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: {
      storySort: {
        method: '',
        order: ['Components', ['All']],
        locales: '',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [withTranslations],
}

export default preview
