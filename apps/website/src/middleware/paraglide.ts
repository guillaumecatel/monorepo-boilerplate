import { defineMiddleware } from 'astro:middleware'

import { paraglideMiddleware } from '@/i18n/server'

export default defineMiddleware((context, next) => {
  return paraglideMiddleware(context.request, ({ request }) => next(request))
})
