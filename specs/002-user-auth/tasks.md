# Tâches : Module d'Authentification Utilisateur

**Entrée** : Documents de conception depuis `/specs/002-user-auth/`
**Prérequis** : plan.md (requis), spec.md (requis pour les histoires utilisateur), research.md, data-model.md, contracts/

**Tests** : Les tests sont inclus suivant l'approche TDD comme spécifié dans plan.md.

**Organisation** : Les tâches sont groupées par histoire utilisateur pour permettre l'implémentation et les tests indépendants de chaque histoire.

## Format : `[ID] [P?] [Story] Description`

- **[P]** : Peut s'exécuter en parallèle (fichiers différents, pas de dépendances)
- **[Story]** : À quelle histoire utilisateur cette tâche appartient (ex. : US1, US2, US3)
- Inclure les chemins de fichiers exacts dans les descriptions

## Conventions de Chemins

- **Projet unique** : `src/`, `tests/` à la racine du dépôt
- Les chemins ci-dessous supposent un projet unique - ajuster basé sur la structure plan.md

## Phase 1 : Configuration (Infrastructure Partagée)

**Objectif** : Initialisation du projet et structure de base

- [ ] T001 Installer la dépendance bcryptjs pour le hachage des mots de passe
- [ ] T002 Créer le schéma de table utilisateurs dans la base de données SQLite
- [ ] T003 Initialiser la gestion d'état d'authentification dans localStorage

---

## Phase 2 : Fondation (Prérequis Bloquants)

**Objectif** : Infrastructure de base qui DOIT être complète avant que TOUTE histoire utilisateur puisse être implémentée

**⚠️ CRITIQUE** : Aucun travail d'histoire utilisateur ne peut commencer tant que cette phase n'est pas complète

- [ ] T004 Créer le squelette de bibliothèque d'authentification dans src/lib/auth.js
- [ ] T005 Implémenter la création de compte admin initial au premier lancement
- [ ] T006 Configurer la persistance d'état d'authentification avec localStorage

**Point de contrôle** : Fondation prête - l'implémentation des histoires utilisateur peut maintenant commencer en parallèle

---

## Phase 3 : Histoire Utilisateur 1 - Connexion Administrateur (Priorité : P1) 🎯 MVP

**Objectif** : Permettre la connexion administrateur avec nom d'utilisateur et mot de passe pour accéder au système

**Test Indépendant** : Tenter la connexion avec des identifiants admin valides (admin/admin) et vérifier l'accès aux fonctionnalités admin ; tenter la connexion avec des identifiants invalides et vérifier le message d'erreur

### Tests pour l'Histoire Utilisateur 1 ⚠️

> **NOTE : Écrire ces tests EN PREMIER, s'assurer qu'ils ÉCHOUENT avant l'implémentation**

- [ ] T007 [P] [US1] Test unitaire pour la fonction de connexion dans tests/unit/auth.test.js
- [ ] T008 [P] [US1] Test d'intégration pour l'UI de connexion dans tests/integration/auth-ui.test.js

### Implémentation pour l'Histoire Utilisateur 1

- [ ] T009 [US1] Implémenter la fonction de connexion dans src/lib/auth.js
- [ ] T010 [US1] Créer LoginComponent dans src/ui/login.js
- [ ] T011 [US1] Intégrer la connexion dans le routage de l'app principale dans src/main.js
- [ ] T012 [US1] Ajouter la vérification d'état d'authentification au chargement de l'app

**Point de contrôle** : À ce stade, l'Histoire Utilisateur 1 devrait être entièrement fonctionnelle et testable indépendamment

---

## Phase 4 : Histoire Utilisateur 2 - Gestion des Utilisateurs pour les Administrateurs (Priorité : P2)

**Objectif** : Permettre aux administrateurs de gérer les utilisateurs (ajouter/supprimer) avec des profils utilisateur/admin via une page dédiée

**Test Indépendant** : L'admin se connecte, accède à la page de gestion des utilisateurs, ajoute un nouvel utilisateur, vérifie que l'utilisateur peut se connecter, supprime l'utilisateur

### Tests pour l'Histoire Utilisateur 2 ⚠️

- [ ] T013 [P] [US2] Test unitaire pour les fonctions addUser et deleteUser dans tests/unit/auth.test.js
- [ ] T014 [P] [US2] Test d'intégration pour l'UI de gestion des utilisateurs dans tests/integration/auth-ui.test.js

### Implémentation pour l'Histoire Utilisateur 2

- [ ] T015 [US2] Implémenter la fonction addUser dans src/lib/auth.js
- [ ] T016 [US2] Implémenter la fonction deleteUser dans src/lib/auth.js
- [ ] T017 [US2] Implémenter la fonction listUsers dans src/lib/auth.js
- [ ] T018 [US2] Créer UserManagementComponent dans src/ui/user-management.js
- [ ] T019 [US2] Intégrer la gestion des utilisateurs dans le routage de l'app principale dans src/main.js

**Point de contrôle** : À ce stade, les Histoires Utilisateur 1 ET 2 devraient toutes deux fonctionner indépendamment

---

## Phase 5 : Histoire Utilisateur 3 - Réinitialisation du Mot de Passe Utilisateur (Priorité : P3)

**Objectif** : Permettre aux utilisateurs de réinitialiser leur mot de passe en utilisant une icône de profil

**Test Indépendant** : L'utilisateur se connecte, clique sur l'icône de profil, change le mot de passe, se déconnecte et se reconnecte avec le nouveau mot de passe

### Tests pour l'Histoire Utilisateur 3 ⚠️

- [ ] T020 [P] [US3] Test unitaire pour la fonction changePassword dans tests/unit/auth.test.js
- [ ] T021 [P] [US3] Test d'intégration pour l'UI de profil dans tests/integration/auth-ui.test.js

### Implémentation pour l'Histoire Utilisateur 3

- [ ] T022 [US3] Implémenter la fonction changePassword dans src/lib/auth.js
- [ ] T023 [US3] Créer ProfileComponent dans src/ui/profile.js
- [ ] T024 [US3] Intégrer l'icône de profil dans l'en-tête de l'app dans src/main.js

**Point de contrôle** : Toutes les histoires utilisateur devraient maintenant être fonctionnelles indépendamment

---

## Phase 6 : Finition et Préoccupations Transversales

**Objectif** : Améliorations affectant plusieurs histoires utilisateur

- [ ] T025 [P] Ajouter la gestion d'erreurs et les messages conviviaux dans tous les composants d'authentification
- [ ] T026 Nettoyage du code et refactorisation dans la bibliothèque d'authentification
- [ ] T027 [P] Tests unitaires supplémentaires pour les cas limites dans tests/unit/auth.test.js
- [ ] T028 Durcissement de la sécurité (validation des entrées, prévention de l'auto-suppression admin)
- [ ] T029 Exécuter la validation quickstart.md pour le module d'authentification

---

## Dépendances et Ordre d'Exécution

### Dépendances de Phase

- **Configuration (Phase 1)** : Aucune dépendance - peut commencer immédiatement
- **Fondation (Phase 2)** : Dépend de la completion de la Configuration - BLOQUE toutes les histoires utilisateur
- **Histoires Utilisateur (Phase 3+)** : Toutes dépendent de la completion de la phase Fondation
  - Les histoires utilisateur peuvent alors procéder en parallèle (si staffées)
  - Ou séquentiellement dans l'ordre de priorité (P1 → P2 → P3)
- **Finition (Phase Finale)** : Dépend de toutes les histoires utilisateur désirées étant complètes

### Dépendances d'Histoire Utilisateur

- **Histoire Utilisateur 1 (P1)** : Peut commencer après Fondation (Phase 2) - Aucune dépendance sur d'autres histoires
- **Histoire Utilisateur 2 (P2)** : Peut commencer après Fondation (Phase 2) - Peut s'intégrer avec US1 mais devrait être testable indépendamment
- **Histoire Utilisateur 3 (P3)** : Peut commencer après Fondation (Phase 2) - Peut s'intégrer avec US1/US2 mais devrait être testable indépendamment

### Au Sein de Chaque Histoire Utilisateur

- Les tests (s'ils sont inclus) DOIVENT être écrits et ÉCHOUER avant l'implémentation
- Fonctions d'authentification avant composants UI
- Implémentation de base avant intégration
- Histoire complète avant de passer à la priorité suivante

### Opportunités de Parallélisation

- Toutes les tâches de Configuration marquées [P] peuvent s'exécuter en parallèle
- Toutes les tâches de Fondation marquées [P] peuvent s'exécuter en parallèle (au sein de la Phase 2)
- Une fois la phase Fondation complète, toutes les histoires utilisateur peuvent commencer en parallèle (si la capacité d'équipe le permet)
- Tous les tests pour une histoire utilisateur marqués [P] peuvent s'exécuter en parallèle
- Différentes histoires utilisateur peuvent être travaillées en parallèle par différents membres d'équipe

---

## Exemple de Parallélisation : Histoire Utilisateur 1

```bash
# Lancer tous les tests pour l'Histoire Utilisateur 1 ensemble :
Tâche : "Test unitaire pour la fonction de connexion dans tests/unit/auth.test.js"
Tâche : "Test d'intégration pour l'UI de connexion dans tests/integration/auth-ui.test.js"

# Lancer les tâches d'implémentation séquentiellement au sein de l'histoire :
Tâche : "Implémenter la fonction de connexion dans src/lib/auth.js"
Tâche : "Créer LoginComponent dans src/ui/login.js"
Tâche : "Intégrer la connexion dans le routage de l'app principale dans src/main.js"
Tâche : "Ajouter la vérification d'état d'authentification au chargement de l'app"
```

---

## Stratégie d'Implémentation

### MVP D'abord (Histoire Utilisateur 1 Uniquement)

1. Compléter Phase 1 : Configuration
2. Compléter Phase 2 : Fondation (CRITIQUE - bloque toutes les histoires)
3. Compléter Phase 3 : Histoire Utilisateur 1
4. **STOP et VALIDER** : Tester l'Histoire Utilisateur 1 indépendamment
5. Déployer/démontrer si prêt

### Livraison Incrémentale

1. Compléter Configuration + Fondation → Fondation prête
2. Ajouter Histoire Utilisateur 1 → Tester indépendamment → Déployer/Démontrer (MVP !)
3. Ajouter Histoire Utilisateur 2 → Tester indépendamment → Déployer/Démontrer
4. Ajouter Histoire Utilisateur 3 → Tester indépendamment → Déployer/Démontrer
5. Chaque histoire ajoute de la valeur sans casser les histoires précédentes

### Stratégie d'Équipe Parallèle

Avec plusieurs développeurs :

1. L'équipe complète Configuration + Fondation ensemble
2. Une fois Fondation terminée :
   - Développeur A : Histoire Utilisateur 1
   - Développeur B : Histoire Utilisateur 2
   - Développeur C : Histoire Utilisateur 3
3. Les histoires se complètent et s'intègrent indépendamment

---

## Notes

- [P] tâches = fichiers différents, pas de dépendances
- Label [Story] mappe la tâche à une histoire utilisateur spécifique pour la traçabilité
- Chaque histoire utilisateur devrait être complétable et testable indépendamment
- Vérifier que les tests échouent avant d'implémenter
- Commiter après chaque tâche ou groupe logique
- S'arrêter à tout point de contrôle pour valider l'histoire indépendamment
- Éviter : tâches vagues, conflits de même fichier, dépendances inter-histoires qui brisent l'indépendance