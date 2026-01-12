import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

import { PageSchema } from '@/schemas'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: PageSchema,
})

export const collections = { pages }
