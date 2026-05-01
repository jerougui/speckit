# research.md

## Decision: local-only storage

- Choix: stocker toutes les métadonnées et les informations d'organisation sur l'appareil de l'utilisateur.
- Rationale: cela minimise la surface de sécurité, évite toute fuite de photos, et respecte la demande explicite de ne rien uploader.
- Alternatives considered:
  - Synchronisation cloud: offre un accès multi-appareil mais complique la sécurité et n'était pas souhaité.
  - Backend distant local: inutile pour une application Vite simple orientée web frontend.

## Decision: SQLite local via sql.js

- Choix: utiliser une base SQLite locale en navigateur avec sql.js ou un module SQLite en WebAssembly.
- Rationale: SQLite permet des requêtes relationnelles simples, un stockage de métadonnées cohérent, et reste local.
- Alternatives considered:
  - IndexedDB brut: plus lourd à gérer pour des jointures et des requêtes sur albums/photos.
  - JSON stocké en localStorage: trop fragile et pauvre pour le volume cible.

## Decision: Vite + vanilla HTML/CSS/JS

- Choix: Vite pour le bundling et le développement rapide, mais interface construite en HTML, CSS et JavaScript pur.
- Rationale: répond à la contrainte de minimalisme de bibliothèques, garantit une application légère et facile à maintenir.
- Alternatives considered:
  - Frameworks JS (React/Vue/Svelte): trop lourds pour ce besoin simple.
  - Application native desktop: hors scope, le spec indique une application web.

## Decision: native Drag and Drop

- Choix: utiliser l'API Drag and Drop native du navigateur pour les albums.
- Rationale: permet de limiter les dépendances externes et de garder la logique simple.
- Alternatives considered:
  - Bibliothèques de drag-and-drop: utiles pour la complexité, mais inadaptées à la contrainte minimaliste.
  - Gestion par boutons de réorganisation seulement: moins intuitive pour l'utilisateur.
