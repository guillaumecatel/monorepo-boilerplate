import { describe, expect, it } from 'vitest'

import { GET } from '@/pages/robots.txt'

describe('Robots.txt page', async () => {
  it('should return a valid robots.txt', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await GET({} as any)
    const text = await response.text()

    expect(response.headers.get('Content-Type')).toBe('text/plain')
    expect(text).toContain('User-agent: *')
    expect(text).toContain('Allow: /')
    expect(text).toContain('Sitemap:')
  })
})
