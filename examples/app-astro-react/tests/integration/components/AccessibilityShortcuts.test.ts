import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import AccessibilityShortcuts from '@/components/AccessibilityShortcuts.astro'

describe('AccessibilityShortcuts component', async () => {
  it('should render skip to main content link', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(AccessibilityShortcuts, {
      request: new Request('http://localhost/about'),
    })

    expect(result).toContain('href="#main-content"')
    expect(result).toContain('sr-only')
  })

  it('should render go to homepage link when not on homepage', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(AccessibilityShortcuts, {
      request: new Request('http://localhost/about'),
    })

    expect(result).toContain('href="/en"')
  })

  it('should not render go to homepage link when on homepage', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(AccessibilityShortcuts, {
      request: new Request('http://localhost/'),
    })

    // Should only have one link (skip to main content)
    const linkCount = (result.match(/<a /g) || []).length
    expect(linkCount).toBe(1)
  })
})
