# Organisateur d'Albums Photos - Spec Kit Process

Un exemple d'application web pour organiser des photos par albums, développée selon le processus **Spec Kit**.

## Vue d'ensemble du processus Spec Kit

Spec Kit est une méthodologie de développement logiciel qui combine :
- **Library-First** : Architecture modulaire et composable
- **Test-First** : Développement piloté par les tests
- **Functional Design** : Approche fonctionnelle
- **Composable Independence** : Modules indépendants
- **Pragmatic Simplicity** : Simplicité pragmatique

## Schéma du processus

```mermaid
graph TD
    A[Constitution] --> B[Spécification]
    B --> C[Planification]
    C --> D[Génération des tâches]
    D --> E[Analyse et validation]
    E --> F[Implémentation]
    F --> G[Première PR]
    G --> H[Phase itérative]
    H --> I[/specify - Nouvelle feature]
    I --> B

    style A fill:#e1f5fe
    style G fill:#c8e6c9
    style H fill:#fff3e0
```

## Phase 1 : Construction initiale

### 1. Constitution (`/speckit.constitution`)
- Définition des principes de développement
- Création du fichier `specs/constitution.md`
- Établissement des règles de gouvernance

### 2. Spécification (`/speckit.specify`)
- Description naturelle de la fonctionnalité
- Génération de `specs/001-organisateur-albums-photos/spec.md`
- Définition des user stories et exigences

### 3. Planification (`/speckit.plan`)
- Analyse technique et architecture
- Création de `specs/001-organisateur-albums-photos/plan.md`
- Choix des technologies et structure

### 4. Génération des tâches (`/speckit.tasks`)
- Décomposition en tâches actionnables
- Création de `specs/001-organisateur-albums-photos/tasks.md`
- Ordonnancement et dépendances

### 5. Analyse (`/speckit.analyze`)
- Validation croisée des artifacts
- Vérification de la cohérence
- Identification des gaps

### 6. Implémentation (`/speckit.implement`)
- Exécution des tâches selon le plan
- Développement TDD (Test-Driven Development)
- Validation continue

### 7. Première Pull Request
- Code complet et testé
- Documentation à jour
- Prêt pour review et déploiement

## Phase 2 : Développement itératif

Après la première release, le développement continue de manière itérative :

1. **Nouvelle fonctionnalité** : `/speckit.specify "nouvelle feature"`
2. **Reprise du cycle** : Spécification → Plan → Tâches → Analyse → Implémentation
3. **Intégration continue** : Chaque itération produit une PR
4. **Évolution progressive** : Amélioration continue selon les principes

## Structure du projet

```
speckit/
├── .specify/                    # Configuration Spec Kit
│   └── memory/
│       └── constitution.md      # Principes de développement
├── specs/                       # Spécifications et plans
│   └── 001-organisateur-albums-photos/
│       ├── spec.md             # Spécification fonctionnelle
│       ├── plan.md             # Plan technique
│       ├── tasks.md            # Tâches d'implémentation
│       ├── data-model.md       # Modèle de données
│       ├── contracts/          # Contrats d'interface
│       └── research.md         # Recherches et décisions
├── src/                        # Code source
│   ├── lib/                    # Modules métier
│   ├── ui/                     # Composants interface
│   └── main.js                 # Point d'entrée
├── tests/                      # Tests
└── package.json               # Dépendances
```

## Technologies utilisées

- **Frontend** : JavaScript ES2024+, HTML5, CSS3
- **Build** : Vite 5.4+
- **Base de données** : SQLite via sql.js (WebAssembly)
- **Tests** : Vitest + happy-dom
- **Persistance** : IndexedDB pour les métadonnées et fichiers

## Fonctionnalités implémentées

- ✅ Création et gestion d'albums
- ✅ Organisation des photos par date
- ✅ Affichage en mode tuile
- ✅ Drag & drop pour réorganiser les albums
- ✅ Stockage local (pas de cloud)
- ✅ Interface française
- ✅ Persistance des données après refresh

## Démarrage rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Tests
npm test

# Build de production
npm run build
```

Ouvrir `http://localhost:5173` dans un navigateur moderne.

## Principes Spec Kit appliqués

### Library-First Architecture
- Modules composables dans `src/lib/`
- Séparation claire des responsabilités
- Interfaces cohérentes

### Test-First Development
- Tests unitaires et d'intégration
- Couverture complète des fonctionnalités
- Validation automatique

### Functional Design
- Fonctions pures privilégiées
- Immutabilité des données
- Composition plutôt qu'héritage

### Composable Independence
- Modules indépendants testables séparément
- Injection de dépendances
- Contrats d'interface clairs

### Pragmatic Simplicity
- Code simple et lisible
- Solutions adaptées au contexte
- Évitement de l'over-engineering

## Contribution

Ce projet suit le processus Spec Kit :

1. `/speckit.specify "votre nouvelle fonctionnalité"`
2. Suivre le cycle complet : plan → tâches → analyse → implémentation
3. Créer une PR avec tests et documentation

## Licence

MIT</content>
<parameter name="filePath">c:\ENVDEV\depot\speckit\README.md