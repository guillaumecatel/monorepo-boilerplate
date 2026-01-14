import { describe, expect, it } from 'vitest'

import { GET } from '@/pages/manifest.webmanifest'

describe('Manifest page', async () => {
  it('should return a valid manifest.webmanifest', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await GET({} as any)
    const text = await response.text()
    const manifest = JSON.parse(text)

    expect(response.headers.get('Content-Type')).toBe(
      'application/manifest+json',
    )
    expect(manifest).toHaveProperty('name')
    expect(manifest).toHaveProperty('short_name')
    expect(manifest).toHaveProperty('description')
    expect(manifest).toHaveProperty('lang')
    expect(manifest).toHaveProperty('start_url')
    expect(manifest).toHaveProperty('scope')
    expect(manifest).toHaveProperty('display')
    expect(manifest).toHaveProperty('orientation')
    expect(manifest).toHaveProperty('icons')
    expect(manifest.icons).toBeInstanceOf(Array)
    expect(manifest.icons.length).toBeGreaterThan(0)
  })
})
