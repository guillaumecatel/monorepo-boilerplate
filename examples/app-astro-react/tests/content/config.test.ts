import { describe, expect, it } from 'vitest'

import { collections } from '@/content/config'

describe('Content collections', () => {
  it('should have pages collection defined', () => {
    expect(collections).toHaveProperty('pages')
    expect(collections.pages).toBeDefined()
  })

  it('should have schema configured for pages', () => {
    expect(collections.pages.schema).toBeDefined()
  })
})
