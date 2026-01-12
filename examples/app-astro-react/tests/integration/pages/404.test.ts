import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import PageNotFound from '@/pages/404.astro'

describe('404 page', async () => {
  it('should render the 404 page', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(PageNotFound)

    expect(result).toContain('Page not found')
    expect(result).toContain('The page you are looking for does not exist.')
  })
})
