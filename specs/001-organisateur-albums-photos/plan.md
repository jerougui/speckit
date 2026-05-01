# Implementation Plan: Organisateur d'Albums Photos

**Branch**: `master` | **Date**: 2026-05-01 | **Spec**: [specs/001-organisateur-albums-photos/spec.md](specs/001-organisateur-albums-photos/spec.md)
**Input**: Feature specification from `/specs/001-organisateur-albums-photos/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Construire une application web Vite simple qui aide à organiser les photos dans des albums séparés, groupés par date, et réorganisables par glisser-déposer sur la page principale. L'application reste locale-only : les images ne sont jamais envoyées ailleurs et les métadonnées sont stockées dans une base SQLite locale via une bibliothèque légère. L'interface est en français et l'implémentation privilégie HTML, CSS et JavaScript vanille.

## Technical Context

**Language/Version**: JavaScript moderne (ES2024+), HTML5, CSS3, Vite 5+
**Primary Dependencies**: Vite, sql.js (SQLite en WebAssembly), aucune bibliothèque de glisser-déposer externe (utiliser l'API native Drag and Drop)
**Storage**: Base SQLite locale gérée en navigateur via sql.js et persistance optionnelle sur le stockage local/IndexedDB
**Testing**: Vitest pour les tests unitaires et fonctionnels légers, tests manuels de l'interface dans un navigateur moderne
**Target Platform**: Navigateurs web modernes de bureau, possible PWA légère
**Project Type**: Web application (frontend-only)
**Performance Goals**: chargement de la page principale < 2s pour 100 albums; affichage d'un album de 50 photos < 2s; interactions de drag-and-drop réactives (< 50ms perceptible)
**Constraints**: local-only, pas d'albums imbriqués, interface en français, minimalisme des bibliothèques, architecture library-first et test-first
**Scale/Scope**: support de 1000 albums et 10 000 métadonnées de photos dans SQLite sans dégradation visible

## Constitution Check

- La conception respecte le principe Library-First en segmentant la logique en modules réutilisables : stockage SQLite, gestion d'albums, rendu d'UI, et interaction drag-and-drop.
- La stratégie Test-First est supportée par l'utilisation de tests unitaires Vitest avant l'implémentation des fonctions clés.
- Le design est orienté fonctionnel : les transformations de données sont réalisées par des fonctions pures, les effets sont gérés dans des adaptateurs isolés.
- La décision local-only améliore la sécurité et reste conforme au principe de simplicité pragmatique.

**Gate**: La conception passe la vérification de constitution tant que l'équipe maintient des bibliothèques indépendantes et des tests TDD pour chaque composant.

## Project Structure

### Documentation (this feature)

```text
specs/001-organisateur-albums-photos/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── lib/
│   ├── album-store.js
│   ├── photo-model.js
│   └── sqlite-adapter.js
├── ui/
│   ├── album-list.js
│   ├── photo-tile-view.js
│   └── drag-drop.js
├── index.html
├── styles.css
└── main.js

tests/
├── unit/
│   ├── album-store.test.js
│   ├── photo-model.test.js
│   └── drag-drop.test.js
└── integration/
    └── album-ui.test.js
```

**Structure Decision**: Choisir une application web frontend-only avec un seul projet `src/` et `tests/` à la racine. Cette structure est la plus simple pour Vite et permet de conserver un design library-first sans backend séparé.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Aucun | Architecture simple et adaptée | Non applicable |
