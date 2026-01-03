import type { APIRoute } from 'astro'

import { PROJECT_DESCRIPTION, PROJECT_NAME, PROJECT_SHORT_NAME } from '@/config'
import { getLocale, localizeHref } from '@/i18n/runtime'

export const GET: APIRoute = async () => {
  const currentLocale = getLocale()

  return new Response(
    JSON.stringify({
      name: PROJECT_NAME,
      short_name: PROJECT_SHORT_NAME,
      description: PROJECT_DESCRIPTION,
      lang: currentLocale,
      start_url: `${localizeHref('/', { locale: currentLocale })}?utm_source=pwa`,
      scope: localizeHref('/', { locale: currentLocale }),
      display_override: ['window-controls-overlay'],
      display: 'standalone',
      orientation: 'portrait',
      screenshots: [
        {
          src: '/images/screenshot.png',
          sizes: '1200x630',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Simple website',
        },
        {
          src: '/images/screenshot.png',
          sizes: '1200x630',
          type: 'image/png',
          label: 'Simple website',
        },
      ],
      icons: [
        {
          sizes: '1024x1024',
          src: '/icons/maskable_icon.png',
          type: 'image/png',
        },
        {
          sizes: '48x48',
          src: '/icons/maskable_icon_x48.png',
          type: 'image/png',
        },
        {
          sizes: '72x72',
          src: '/icons/maskable_icon_x72.png',
          type: 'image/png',
        },
        {
          sizes: '96x96',
          src: '/icons/maskable_icon_x96.png',
          type: 'image/png',
        },
        {
          sizes: '128x128',
          src: '/icons/maskable_icon_x128.png',
          type: 'image/png',
        },
        {
          sizes: '192x192',
          src: '/icons/maskable_icon_x192.png',
          type: 'image/png',
        },
        {
          sizes: '384x384',
          src: '/icons/maskable_icon_x384.png',
          type: 'image/png',
        },
        {
          sizes: '512x512',
          src: '/icons/maskable_icon_x512.png',
          type: 'image/png',
        },
      ],
    }),
    {
      headers: {
        'Content-Type': 'application/manifest+json',
      },
    },
  )
}
