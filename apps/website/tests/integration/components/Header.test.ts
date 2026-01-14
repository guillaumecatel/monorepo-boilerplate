import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import Header from '@/components/Header.astro'

describe('Header component', async () => {
  it('should render main navigation', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Header, {
      request: new Request('http://localhost/'),
    })

    expect(result).toContain('header')
    expect(result).toContain('<nav')
    expect(result).toContain('href="/en"')
    expect(result).toContain('href="/en/about"')
  })

  it('should render language selector', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Header, {
      request: new Request('http://localhost/'),
    })

    expect(result).toContain('hreflang="fr"')
    expect(result).toContain('hreflang="en"')
    expect(result).toContain('lang="fr"')
    expect(result).toContain('lang="en"')
  })

  it('should mark current page as active', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Header, {
      request: new Request('http://localhost/about'),
    })

    expect(result).toContain('aria-current="page"')
  })

  it('should mark current locale as active', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Header, {
      request: new Request('http://localhost/'),
    })

    // Current locale should be marked
    expect(result).toContain('aria-current="page"')
  })
})
