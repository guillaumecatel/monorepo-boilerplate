import { describe, expect, it } from 'vitest'

import { PageSchema } from '@/schemas'

describe('Page schema', () => {
  it('should validate a valid page object', () => {
    const validPage = {
      id: 'test-en',
      title: 'Test Page',
      description: 'A test page',
      locale: 'en' as const,
    }

    const result = PageSchema.safeParse(validPage)
    expect(result.success).toBe(true)
  })

  it('should validate a page without description', () => {
    const validPage = {
      id: 'test-fr',
      title: 'Page de test',
      locale: 'fr' as const,
    }

    const result = PageSchema.safeParse(validPage)
    expect(result.success).toBe(true)
  })

  it('should reject invalid locale', () => {
    const invalidPage = {
      id: 'test-es',
      title: 'Test Page',
      locale: 'es',
    }

    const result = PageSchema.safeParse(invalidPage)
    expect(result.success).toBe(false)
  })

  it('should reject missing required fields', () => {
    const invalidPage = {
      title: 'Test Page',
    }

    const result = PageSchema.safeParse(invalidPage)
    expect(result.success).toBe(false)
  })
})
