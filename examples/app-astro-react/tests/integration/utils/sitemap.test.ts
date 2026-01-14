import { describe, expect, it } from 'vitest'

import { createStaticSitemapEntry } from '@/utils/sitemap'

describe('Sitemap utilities', () => {
  it('should create a sitemap entry for root path', () => {
    const entry = createStaticSitemapEntry('')

    expect(entry).toContain('<url>')
    expect(entry).toContain('<loc>')
    expect(entry).toContain('</url>')
    expect(entry).toContain('<xhtml:link')
    expect(entry).toContain('rel="alternate"')
    expect(entry).toContain('hreflang="en"')
  })

  it('should create a sitemap entry for about page', () => {
    const entry = createStaticSitemapEntry('about')

    expect(entry).toContain('<url>')
    expect(entry).toContain('<loc>')
    expect(entry).toContain('about')
    expect(entry).toContain('</url>')
    expect(entry).toContain('<xhtml:link')
  })

  it('should create a sitemap entry with localized URLs', () => {
    const entry = createStaticSitemapEntry('privacy-policy')

    expect(entry).toContain('privacy-policy')
    expect(entry).toContain('hreflang="en"')
  })
})
