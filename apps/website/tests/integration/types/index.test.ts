import { describe, expect, it } from 'vitest'

import type { AlternativeHrefLang } from '@/types'

describe('Types', () => {
  it('should define AlternativeHrefLang type', () => {
    const alternateHref: AlternativeHrefLang = {
      locale: 'en',
      href: '/en/about',
    }

    expect(alternateHref).toHaveProperty('locale')
    expect(alternateHref).toHaveProperty('href')
    expect(alternateHref.locale).toBe('en')
    expect(alternateHref.href).toBe('/en/about')
  })
})
