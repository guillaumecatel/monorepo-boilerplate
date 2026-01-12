import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import Footer from '@/components/Footer.astro'

describe('Footer component', async () => {
  it('should render footer navigation', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer, {
      request: new Request('http://localhost/'),
    })

    expect(result).toContain('footer')
    expect(result).toContain('<nav')
    expect(result).toContain('privacy-policy')
    expect(result).toContain('terms-of-service')
    expect(result).toContain('cookie-policy')
    expect(result).toContain('accessibility')
  })

  it('should render copyright notice', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer, {
      request: new Request('http://localhost/'),
    })

    const currentYear = new Date().getFullYear()
    expect(result).toContain(`© ${currentYear}`)
  })

  it('should mark current page as active', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer, {
      request: new Request('http://localhost/privacy-policy'),
    })

    expect(result).toContain('aria-current="page"')
  })
})
