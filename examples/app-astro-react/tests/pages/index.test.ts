import { getContainerRenderer as reactContainerRenderer } from '@astrojs/react'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { describe, expect, it } from 'vitest'

import Index from '@/pages/index.astro'

const renderers = await loadRenderers([reactContainerRenderer()])

describe('Index page', async () => {
  it('should render the index page', async () => {
    const container = await AstroContainer.create({ renderers })
    const result = await container.renderToString(Index)

    expect(result).toContain('Hi John Doe!')
  })
})
