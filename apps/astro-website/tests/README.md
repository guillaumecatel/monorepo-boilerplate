# Tests Astro Website

## Structure des tests

Ce projet utilise Vitest avec l'API `AstroContainer` pour tester les composants et pages Astro.

### Tests actuels

- ✅ **Components** : AccessibilityShortcuts, Footer, Header
- ✅ **Layouts** : Layout, partials (Meta, HeadHreflang, etc.)
- ✅ **Pages simples** : index, 404, manifest.webmanifest, robots.txt, sitemap.xml
- ✅ **Utils** : sitemap
- ✅ **Schemas** : PageSchema validation
- ✅ **Types** : AlternativeHrefLang
- ✅ **Middleware** : i18n middleware
- ✅ **Content** : config validation

### Pages non testées

Les pages suivantes ne sont **pas testées unitairement** car elles utilisent `getEntry()` et `Astro.rewrite()` qui nécessitent un contexte Astro complet avec collections et routing :

- ❌ `/about`
- ❌ `/accessibility`
- ❌ `/cookie-policy`
- ❌ `/privacy-policy`
- ❌ `/terms-of-service`

**Raison** : `AstroContainer` ne charge pas automatiquement les content collections ni le système de routing. Tester ces pages nécessiterait :

1. Mocker `getEntry()` et `render()` de `astro:content`
2. Mocker `Astro.rewrite()` et le routing complet
3. Ce qui rendrait les tests peu utiles car ils ne testeraient que les mocks

**Alternative recommandée** : Ces pages devraient être testées via des tests E2E (Playwright, Cypress) qui testent l'application complète en conditions réelles.

## Exécution des tests

```bash
# Tous les tests
pnpm test

# Avec couverture
pnpm test -- --coverage

# En mode watch
pnpm test -- --watch

# Tests spécifiques
pnpm test -- tests/components
```

## Limitations de AstroContainer

L'API `AstroContainer` est parfaite pour :

- ✅ Composants Astro simples
- ✅ Layouts
- ✅ Pages sans dépendances complexes
- ✅ Utilitaires et fonctions

Elle **ne supporte pas** nativement :

- ❌ Content Collections (getEntry, render)
- ❌ Astro.rewrite() et routing
- ❌ Middleware (testable séparément)
- ❌ API endpoints

Pour ces cas, privilégiez les tests E2E ou les tests d'intégration complets.
