# Plan d'Implémentation : Module d'Authentification Utilisateur

**Branche** : `feature/auth-module` | **Date** : 3 mai 2026 | **Spécification** : [specs/002-user-auth/spec.md](specs/002-user-auth/spec.md)
**Entrée** : Spécification de fonctionnalité depuis `/specs/002-user-auth/spec.md`

**Note** : Ce modèle est rempli par la commande `/speckit.plan`. Voir `.specify/templates/plan-template.md` pour le workflow d'exécution.

## Résumé

Implémenter le module d'authentification utilisateur pour l'organisateur d'albums photo avec authentification login/mot de passe, gestion des utilisateurs admin, et gestion des profils. L'approche technique utilise une bibliothèque d'authentification autonome avec bcryptjs pour le hachage des mots de passe, SQLite pour le stockage des utilisateurs, et des composants UI JavaScript vanilla intégrés avec l'architecture d'application existante.

## Contexte Technique

**Langage/Version** : JavaScript ES2020 (type module)  
**Dépendances Principales** : sql.js, Vite, Vitest, bcryptjs (CLARIFICATION REQUISE pour le hachage des mots de passe)  
**Stockage** : SQLite via sql.js (base de données en navigateur)  
**Tests** : Vitest avec happy-dom  
**Plateforme Cible** : Navigateur web  
**Type de Projet** : Application web (SPA)  
**Objectifs de Performance** : Connexion en moins de 3 secondes sur des connexions standard  
**Contraintes** : Stockage sécurisé des mots de passe (hachage), côté client uniquement, pas de backend serveur  
**Échelle/Portée** : Petite application pour l'organisation d'albums photo, peu d'utilisateurs simultanés attendus

## Vérification de la Constitution

*PORTE : Doit passer avant la recherche Phase 0. Re-vérifier après la conception Phase 1.*

**Library-First** : La fonctionnalité sera implémentée comme une bibliothèque d'authentification autonome dans `src/lib/auth.js` avec des APIs composables pour la connexion, la gestion des utilisateurs et les opérations de profil.

**Test-First** : Toute la fonctionnalité d'authentification suivra TDD avec des tests Vitest dans `tests/unit/auth.test.js`.

**Design Fonctionnel** : La bibliothèque d'authentification utilisera des fonctions pures pour le hachage des mots de passe, la validation et les opérations utilisateur. Les effets de bord sont isolés dans l'adaptateur SQLite.

**Design Indépendant, Composable** : La bibliothèque d'authentification sera testable indépendamment et réutilisable, dépendant uniquement de l'adaptateur SQLite existant.

**Simplicité Pragmatique** : Implémentation d'authentification côté client simple sans complexité inutile comme JWT ou composants côté serveur.

**Contraintes Supplémentaires** : L'authentification est livrée comme une bibliothèque assemblée dans l'application web, pas comme une fonctionnalité monolithique.

**Workflow de Développement** : TDD strict appliqué, avec les tests écrits en premier et la décomposition fonctionnelle maintenue.

*Évaluation des Portes* : Tous les principes sont satisfaits. Aucune violation.

*Révision Post-Conception* : La conception maintient l'architecture library-first avec des contrats API clairs. La bibliothèque d'authentification est testable indépendamment et composable. Aucune violation introduite.

## Structure du Projet

### Documentation (cette fonctionnalité)

```text
specs/[###-feature]/
├── plan.md              # Ce fichier (sortie commande /speckit.plan)
├── research.md          # Sortie Phase 0 (/speckit.plan command)
├── data-model.md        # Sortie Phase 1 (/speckit.plan command)
├── quickstart.md        # Sortie Phase 1 (/speckit.plan command)
├── contracts/           # Sortie Phase 1 (/speckit.plan command)
└── tasks.md             # Sortie Phase 2 (/speckit.tasks command - NON créé par /speckit.plan)
```

## Structure du Projet

### Documentation (cette fonctionnalité)

```text
specs/002-user-auth/
├── plan.md              # Ce fichier (sortie commande /speckit.plan)
├── research.md          # Sortie Phase 0 (/speckit.plan command)
├── data-model.md        # Sortie Phase 1 (/speckit.plan command)
├── quickstart.md        # Sortie Phase 1 (/speckit.plan command)
├── contracts/           # Sortie Phase 1 (/speckit.plan command)
└── tasks.md             # Sortie Phase 2 (/speckit.tasks command - NON créé par /speckit.plan)
```

### Code Source (racine du dépôt)

```text
src/
├── lib/
│   ├── auth.js          # Nouveau : Bibliothèque d'authentification avec fonctions de connexion, gestion utilisateurs, profils
│   ├── album-store.js
│   ├── photo-model.js
│   └── sqlite-adapter.js
├── ui/
│   ├── login.js         # Nouveau : Composant page de connexion
│   ├── user-management.js # Nouveau : Page de gestion des utilisateurs admin
│   ├── profile.js       # Nouveau : Icône de profil et réinitialisation mot de passe
│   ├── album-list.js
│   ├── drag-drop.js
│   ├── photo-tile-view.js
│   └── main.js          # Modifié : Ajouter routage/état d'authentification
├── index.html
├── main.js
└── styles.css

tests/
├── integration/
│   ├── album-ui.test.js
│   └── auth-ui.test.js   # Nouveau : Tests d'intégration UI d'authentification
├── unit/
│   ├── album-store.test.js
│   ├── drag-drop.test.js
│   ├── photo-model.test.js
│   └── auth.test.js      # Nouveau : Tests unitaires bibliothèque d'authentification
```

**Décision de Structure** : Extension des répertoires existants src/lib/ et src/ui/ avec des modules spécifiques à l'authentification. La bibliothèque d'authentification est autonome et composable, les composants UI s'intègrent avec l'architecture JavaScript vanilla existante.

## Suivi de la Complexité

> **REMPLIR UNIQUEMENT si la Vérification de la Constitution a des violations qui doivent être justifiées**

Aucune violation à justifier.
