import type { APIRoute } from 'astro'

import { baseLocale, localizeHref } from '@/i18n/runtime'

export const GET: APIRoute = () => {
  const result = `
    User-agent: *
    Allow: /

    Sitemap: ${localizeHref('sitemap.xml', { locale: baseLocale })}
  `.trim()

  return new Response(result, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
