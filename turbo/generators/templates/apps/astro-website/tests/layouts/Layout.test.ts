import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import Layout from '@/layouts/Layout.astro'

describe('Layout component', async () => {
  it('should render with basic metadata', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout, {
      props: {
        metadata: {
          title: 'Test Page',
          description: 'Test description',
        },
      },
      slots: {
        default: '<main>Content</main>',
      },
    })

    expect(result).toContain('<html')
    expect(result).toContain('Test Page')
    expect(result).toContain('header')
    expect(result).toContain('footer')
    expect(result).toContain('<main>Content</main>')
  })

  it('should include accessibility shortcuts', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout, {
      props: {
        metadata: {
          title: 'Test',
        },
      },
      slots: {
        default: '<div>Test</div>',
      },
    })

    expect(result).toContain('sr-only')
    expect(result).toContain('#main-content')
  })
})
