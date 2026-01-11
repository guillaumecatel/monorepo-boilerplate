import { z } from 'astro:content'

import { locales } from '@/i18n/runtime'

export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  locale: z.enum(locales),
})
