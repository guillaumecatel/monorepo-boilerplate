import { describe, expect, it } from 'vitest'

import { GET } from '@/pages/sitemap.xml'

describe('Sitemap page', async () => {
  it('should return a valid sitemap.xml', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await GET({} as any)
    const xml = await response.text()

    expect(response.headers.get('Content-Type')).toBe('application/xml')
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    )
    expect(xml).toContain('<url>')
    expect(xml).toContain('<loc>')
    expect(xml).toContain('<xhtml:link')
    expect(xml).toContain('about')
    expect(xml).toContain('privacy-policy')
    expect(xml).toContain('terms-of-service')
    expect(xml).toContain('cookie-policy')
    expect(xml).toContain('accessibility')
  })
})
