import { describe, expect, it } from 'vitest'

import { onRequest } from '@/middleware'

describe('Middleware', () => {
  it('should export onRequest', () => {
    expect(onRequest).toBeDefined()
    expect(typeof onRequest).toBe('function')
  })
})
