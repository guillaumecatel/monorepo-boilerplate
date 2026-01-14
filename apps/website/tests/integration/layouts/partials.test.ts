import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import Body from '@/layouts/partials/Body.astro'
import Document from '@/layouts/partials/Document.astro'
import Head from '@/layouts/partials/Head.astro'
import Html from '@/layouts/partials/Html.astro'

describe('Layout partials', async () => {
  describe('Body', () => {
    it('should render body element', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(Body, {
        slots: {
          default: '<div>Test</div>',
        },
      })

      expect(result).toContain('<body')
      expect(result).toContain('<div>Test</div>')
    })
  })

  describe('Document', () => {
    it('should render document wrapper', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(Document, {
        slots: {
          default: '<div>Test</div>',
        },
      })

      expect(result).toContain('<div>Test</div>')
    })
  })

  describe('Head', () => {
    it('should render head with title', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(Head, {
        props: {
          title: 'Test Page',
          description: 'Test description',
        },
      })

      expect(result).toContain('<title>')
      expect(result).toContain('Test Page')
      expect(result).toContain('Test description')
    })

    it('should render meta tags', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(Head, {
        props: {
          title: 'Test',
          description: 'Description',
        },
      })

      expect(result).toContain('charset="utf-8"')
      expect(result).toContain('name="viewport"')
      expect(result).toContain('name="description"')
    })

    it('should render alternate links', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(Head, {
        props: {
          title: 'Test',
          alternates: [
            { locale: 'fr', href: '/test' },
            { locale: 'en', href: '/en/test' },
          ],
        },
      })

      expect(result).toContain('rel="alternate"')
      expect(result).toContain('hreflang="fr"')
      expect(result).toContain('hreflang="en"')
    })
  })

  describe('Html', () => {
    it('should render html element with lang attribute', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(Html, {
        slots: {
          default: '<div>Test</div>',
        },
      })

      expect(result).toContain('<html')
      expect(result).toContain('lang=')
      expect(result).toContain('<div>Test</div>')
    })
  })
})
