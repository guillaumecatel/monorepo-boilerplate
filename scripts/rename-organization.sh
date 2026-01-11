#!/bin/bash

# Script de renommage d'organisation pour le monorepo
# Usage: ./scripts/rename-organization.sh

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✔${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✖${NC} $1"
}

# Vérifier qu'on est à la racine du monorepo
if [ ! -f "package.json" ] || [ ! -f "turbo.json" ]; then
    log_error "Ce script doit être exécuté depuis la racine du monorepo"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║       Script de renommage d'organisation                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Demander les anciennes valeurs
log_info "Valeurs actuelles de l'organisation"
echo ""
read -p "Scope actuel (ex: guillaumecatel): " OLD_SCOPE
read -p "Nom actuel (ex: Guillaume CATEL): " OLD_NAME
read -p "Email actuel (ex: hello@guillaumecatel.com): " OLD_EMAIL
read -p "URL du repo actuel (ex: https://github.com/guillaumecatel/monorepo): " OLD_REPO_URL

# Extraire owner et repo de l'URL
OLD_REPO_OWNER=$(echo "$OLD_REPO_URL" | sed -n 's|.*github.com/\([^/]*\)/.*|\1|p')
OLD_REPO_NAME=$(echo "$OLD_REPO_URL" | sed -n 's|.*github.com/[^/]*/\([^/]*\).*|\1|p')

echo ""
log_info "Nouvelles valeurs de l'organisation"
echo ""
read -p "Nouveau scope (ex: mycompany): " NEW_SCOPE
read -p "Nouveau nom (ex: My Company): " NEW_NAME
read -p "Nouvel email (ex: contact@mycompany.com): " NEW_EMAIL
read -p "Nouvelle URL du repo (ex: https://github.com/mycompany/monorepo): " NEW_REPO_URL

# Extraire owner et repo de la nouvelle URL
NEW_REPO_OWNER=$(echo "$NEW_REPO_URL" | sed -n 's|.*github.com/\([^/]*\)/.*|\1|p')
NEW_REPO_NAME=$(echo "$NEW_REPO_URL" | sed -n 's|.*github.com/[^/]*/\([^/]*\).*|\1|p')

# Vérifier les anciennes valeurs
if [ -z "$OLD_REPO_OWNER" ] || [ -z "$OLD_REPO_NAME" ]; then
    log_error "URL du repo actuel invalide"
    exit 1
fi

if [ -z "$NEW_REPO_OWNER" ] || [ -z "$NEW_REPO_NAME" ]; then
    log_error "Nouvelle URL du repo invalide"
    exit 1
fi

# Afficher un résumé
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    RÉSUMÉ DES CHANGEMENTS                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Scope:        @$OLD_SCOPE → @$NEW_SCOPE"
echo "Nom:          $OLD_NAME → $NEW_NAME"
echo "Email:        $OLD_EMAIL → $NEW_EMAIL"
echo "Repository:   $OLD_REPO_URL → $NEW_REPO_URL"
echo ""

# Confirmation
read -p "Confirmer ces changements ? (o/n): " CONFIRM
if [ "$CONFIRM" != "o" ] && [ "$CONFIRM" != "O" ]; then
    log_warning "Opération annulée"
    exit 0
fi

echo ""
log_info "Début du renommage..."
echo ""

# Fonction pour remplacer dans les fichiers
replace_in_files() {
    local pattern=$1
    local replacement=$2
    local description=$3
    
    log_info "Remplacement: $description"
    
    # Trouver et remplacer dans tous les fichiers pertinents
    find . -type f \( \
        -name "*.json" -o \
        -name "*.ts" -o \
        -name "*.tsx" -o \
        -name "*.js" -o \
        -name "*.jsx" -o \
        -name "*.md" -o \
        -name "*.hbs" -o \
        -name "*.css" -o \
        -name ".env.example" \
    \) \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/.next/*" \
    -not -path "*/build/*" \
    -not -path "*/.turbo/*" \
    -not -path "*/pnpm-lock.yaml" \
    -exec sed -i '' "s|$pattern|$replacement|g" {} \;
}

# 1. Remplacer le scope des packages
replace_in_files "@$OLD_SCOPE/" "@$NEW_SCOPE/" "scope des packages (@$OLD_SCOPE → @$NEW_SCOPE)"

# 2. Remplacer le nom de l'organisation
replace_in_files "$OLD_NAME" "$NEW_NAME" "nom de l'organisation"

# 3. Remplacer l'email
replace_in_files "$OLD_EMAIL" "$NEW_EMAIL" "email"

# 4. Remplacer l'URL complète du repo
replace_in_files "$OLD_REPO_URL" "$NEW_REPO_URL" "URL complète du repository"

# 5. Remplacer owner/repo dans les formats courts
if [ "$OLD_REPO_OWNER/$OLD_REPO_NAME" != "$NEW_REPO_OWNER/$NEW_REPO_NAME" ]; then
    replace_in_files "$OLD_REPO_OWNER/$OLD_REPO_NAME" "$NEW_REPO_OWNER/$NEW_REPO_NAME" "owner/repo"
fi

# 6. Mettre à jour .env.example
log_info "Mise à jour de .env.example"
if [ -f ".env.example" ]; then
    cat > .env.example <<EOF
ORGANIZATION_SCOPE_NAME="$NEW_SCOPE"
ORGANIZATION_NAME="$NEW_NAME"
ORGANIZATION_EMAIL="$NEW_EMAIL"
ORGANIZATION_REPOSITORY_NAME="$NEW_REPO_NAME"
ORGANIZATION_REPOSITORY_URL="$NEW_REPO_URL"
EOF
    log_success ".env.example mis à jour"
fi

# 7. Mettre à jour turbo/generators/helpers.ts
log_info "Mise à jour de turbo/generators/helpers.ts"
if [ -f "turbo/generators/helpers.ts" ]; then
    # Mise à jour des valeurs par défaut dans les helpers
    sed -i '' "s/ORGANIZATION_NAME ?? '[^']*'/ORGANIZATION_NAME ?? '$NEW_NAME'/g" turbo/generators/helpers.ts
    sed -i '' "s/ORGANIZATION_EMAIL ?? '[^']*'/ORGANIZATION_EMAIL ?? '$NEW_EMAIL'/g" turbo/generators/helpers.ts
    sed -i '' "s/ORGANIZATION_SCOPE_NAME ?? '[^']*'/ORGANIZATION_SCOPE_NAME ?? '$NEW_SCOPE'/g" turbo/generators/helpers.ts
    sed -i '' "s/ORGANIZATION_REPOSITORY_NAME ?? '[^']*'/ORGANIZATION_REPOSITORY_NAME ?? '$NEW_REPO_NAME'/g" turbo/generators/helpers.ts
    sed -i '' "s|ORGANIZATION_REPOSITORY_URL ?? '[^']*'|ORGANIZATION_REPOSITORY_URL ?? '$NEW_REPO_URL'|g" turbo/generators/helpers.ts
    log_success "turbo/generators/helpers.ts mis à jour"
fi

echo ""
log_success "Tous les remplacements ont été effectués"
echo ""

# 8. Nettoyer et réinstaller les dépendances
log_info "Nettoyage et réinstallation des dépendances..."
echo ""

if command -v pnpm &> /dev/null; then
    log_info "Suppression de node_modules et du lockfile..."
    find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
    rm -f pnpm-lock.yaml
    
    log_info "Installation des dépendances..."
    pnpm install
    
    log_success "Dépendances réinstallées"
else
    log_warning "pnpm n'est pas installé. Veuillez exécuter 'pnpm install' manuellement"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  RENOMMAGE TERMINÉ !                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
log_success "L'organisation a été renommée avec succès"
echo ""
log_info "Prochaines étapes recommandées:"
echo "  1. Vérifier les changements: git diff"
echo "  2. Tester le build: pnpm build"
echo "  3. Tester les applications: pnpm dev"
echo "  4. Créer un commit: git add . && git commit -m 'chore: rename organization to $NEW_SCOPE'"
echo ""
