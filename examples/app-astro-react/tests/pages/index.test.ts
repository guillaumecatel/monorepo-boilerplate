import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import Index from '@/pages/index.astro'

describe('Index page', async () => {
  it('should render the index page', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Index)

    expect(result).toContain('Hi John Doe!')
  })
})
