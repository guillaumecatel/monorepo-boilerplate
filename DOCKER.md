# Docker Multi-Stage Build

Ce monorepo utilise une approche multi-stage basée sur [la documentation officielle de pnpm](https://pnpm.io/docker#example-2-build-multiple-docker-images-in-a-monorepo).

## Architecture

### Stage 1: Base

Image de base avec Node.js et pnpm configurés.

### Stage 2: Build (partagé)

- Installe **toutes** les dépendances du monorepo
- Build **tous** les projets avec `pnpm run -r build`
- Partagé par toutes les apps pour optimiser le cache Docker

### Stages 3+: Runtime (par app)

- Utilise `pnpm deploy --filter` pour copier **uniquement** les dépendances nécessaires
- 1 stage par application dans `apps/`
- Génération automatique via `pnpm gen`

## Génération automatique

Quand vous créez une nouvelle app avec le générateur Turborepo :

```bash
pnpm gen app-astro-react
# Nom: my-app
```

Le générateur va :

1. ✅ Copier l'exemple depuis `examples/app-astro-react`
2. ✅ Créer le dossier `apps/my-app`
3. ✅ **Ajouter automatiquement** un stage Docker dans `Dockerfile`
4. ✅ Assigner un port disponible (auto-incrémenté)

## Build d'une app

```bash
# Build l'image pour une app spécifique
docker build --target my-app -t my-app:latest .

# Run
docker run -p 3000:3000 my-app:latest
```

## Build de toutes les apps

```bash
# Pour chaque app dans apps/
docker build --target app1 -t app1:latest .
docker build --target app2 -t app2:latest .
```

## Configuration requise

Le fichier `.npmrc` à la racine **doit** contenir :

```
inject-workspace-packages=true
```

Après modification, mettez à jour le lockfile :

```bash
pnpm install --no-frozen-lockfile
```

## Structure du Dockerfile

```dockerfile
# Stage base
FROM node:24-alpine AS base
...

# Stage build (partagé)
FROM base AS build
COPY . /usr/src/app
RUN pnpm install --frozen-lockfile
RUN pnpm run -r build

# === AUTO-GENERATED STAGES BELOW ===
# Ne pas éditer manuellement - géré par turbo/generators

# app1
RUN pnpm deploy --filter="app1" --prod /prod/app1
FROM gcr.io/distroless/nodejs24-debian12 AS app1
...

# app2
RUN pnpm deploy --filter="app2" --prod /prod/app2
FROM gcr.io/distroless/nodejs24-debian12 AS app2
...
```

## Avantages de cette approche

✅ **1 build** pour toutes les dépendances (cache partagé)  
✅ **Images optimisées** - seulement les dépendances nécessaires  
✅ **Génération automatique** - pas besoin de gérer manuellement les Dockerfiles  
✅ **Images distroless** - surface d'attaque minimale  
✅ **Conforme pnpm** - approche officielle recommandée
