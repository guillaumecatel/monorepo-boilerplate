import type { Runtime } from '@inlang/paraglide-js'

export default [
  {
    pattern: '/',
    localized: [
      ['fr', '/'],
      ['en', '/en'],
    ],
  },
  {
    pattern: '/about',
    localized: [
      ['fr', '/a-propos'],
      ['en', '/en/about'],
    ],
  },
  {
    pattern: '/cookie-policy',
    localized: [
      ['fr', '/politique-de-cookies'],
      ['en', '/en/cookie-policy'],
    ],
  },
  {
    pattern: '/privacy-policy',
    localized: [
      ['fr', '/politique-de-confidentialite'],
      ['en', '/en/privacy-policy'],
    ],
  },
  {
    pattern: '/terms-of-service',
    localized: [
      ['fr', '/conditions-d-utilisation'],
      ['en', '/en/terms-of-service'],
    ],
  },
  {
    pattern: '/accessibility',
    localized: [
      ['fr', '/accessibilite'],
      ['en', '/en/accessibility'],
    ],
  },
  {
    pattern: '/manifest.webmanifest',
    localized: [
      ['fr', '/manifest.webmanifest'],
      ['en', '/en/manifest.webmanifest'],
    ],
  },
  {
    pattern: '/:path(.*)?',
    localized: [
      ['en', '/en/:path(.*)?'],
      ['fr', '/:path(.*)?'],
    ],
  },
] as Runtime['urlPatterns']
