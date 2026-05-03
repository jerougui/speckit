# Spécification de Fonctionnalité : [NOM DE LA FONCTIONNALITÉ]

**Branche de Fonctionnalité** : `[###-feature-name]`  
**Créé** : [DATE]  
**Statut** : Brouillon  
**Entrée** : Description utilisateur : "$ARGUMENTS"

## Scénarios Utilisateur et Tests *(obligatoire)*

<!--
  IMPORTANT : Les histoires utilisateur devraient être PRIORISÉES comme des parcours utilisateur ordonnés par importance.
  Chaque histoire utilisateur/parcours doit être TESTABLE INDÉPENDAMMENT - signifiant que si vous implémentez JUSTE UNE d'entre elles,
  vous devriez toujours avoir un MVP viable (Minimum Viable Product) qui apporte de la valeur.
  
  Assigner des priorités (P1, P2, P3, etc.) à chaque histoire, où P1 est la plus critique.
  Pensez à chaque histoire comme une tranche autonome de fonctionnalité qui peut être :
  - Développée indépendamment
  - Testée indépendamment
  - Déployée indépendamment
  - Démontrée aux utilisateurs indépendamment
-->

### Histoire Utilisateur 1 - [Titre Bref] (Priorité : P1)

[Décrire ce parcours utilisateur en langage simple]

**Pourquoi cette priorité** : [Expliquer la valeur et pourquoi elle a ce niveau de priorité]

**Test Indépendant** : [Décrire comment ceci peut être testé indépendamment - ex. "Peut être entièrement testé par [action spécifique] et apporte [valeur spécifique]"]

**Scénarios d'Acceptation** :

1. **Étant donné** [état initial], **Quand** [action], **Alors** [résultat attendu]
2. **Étant donné** [état initial], **Quand** [action], **Alors** [résultat attendu]

---

### Histoire Utilisateur 2 - [Titre Bref] (Priorité : P2)

[Décrire ce parcours utilisateur en langage simple]

**Pourquoi cette priorité** : [Expliquer la valeur et pourquoi elle a ce niveau de priorité]

**Test Indépendant** : [Décrire comment ceci peut être testé indépendamment]

**Scénarios d'Acceptation** :

1. **Étant donné** [état initial], **Quand** [action], **Alors** [résultat attendu]

---

### Histoire Utilisateur 3 - [Titre Bref] (Priorité : P3)

[Décrire ce parcours utilisateur en langage simple]

**Pourquoi cette priorité** : [Expliquer la valeur et pourquoi elle a ce niveau de priorité]

**Test Indépendant** : [Décrire comment ceci peut être testé indépendamment]

**Scénarios d'Acceptation** :

1. **Étant donné** [état initial], **Quand** [action], **Alors** [résultat attendu]

---

[Ajouter plus d'histoires utilisateur si nécessaire, chacune avec une priorité assignée]

### Cas Limites

<!--
  ACTION REQUISE : Le contenu de cette section représente des placeholders.
  Les remplir avec les bons cas limites.
-->

- Que se passe-t-il quand [condition de frontière] ?
- Comment le système gère-t-il [scénario d'erreur] ?

## Exigences *(obligatoire)*

<!--
  ACTION REQUISE : Le contenu de cette section représente des placeholders.
  Les remplir avec les bonnes exigences fonctionnelles.
-->

### Exigences Fonctionnelles

- **FR-001** : Le système DOIT [capacité spécifique, ex. "permettre aux utilisateurs de créer des comptes"]
- **FR-002** : Le système DOIT [capacité spécifique, ex. "valider les adresses email"]  
- **FR-003** : Les utilisateurs DOIVENT pouvoir [interaction clé, ex. "réinitialiser leur mot de passe"]
- **FR-004** : Le système DOIT [exigence de données, ex. "persister les préférences utilisateur"]
- **FR-005** : Le système DOIT [comportement, ex. "journaliser tous les événements de sécurité"]

*Exemple de marquage d'exigences peu claires :*

- **FR-006** : Le système DOIT authentifier les utilisateurs via [CLARIFICATION REQUISE : méthode d'auth non spécifiée - email/mot de passe, SSO, OAuth ?]
- **FR-007** : Le système DOIT conserver les données utilisateur pendant [CLARIFICATION REQUISE : période de rétention non spécifiée]

### Entités Clés *(inclure si la fonctionnalité implique des données)*

- **[Entité 1]** : [Ce qu'elle représente, attributs clés sans implémentation]
- **[Entité 2]** : [Ce qu'elle représente, relations avec d'autres entités]

## Critères de Succès *(obligatoire)*

<!--
  ACTION REQUISE : Définir des critères de succès mesurables.
  Ceux-ci doivent être agnostiques technologiques et mesurables.
-->

### Résultats Mesurables

- **SC-001** : [Métrique mesurable, ex. "Les utilisateurs peuvent compléter la création de compte en moins de 2 minutes"]
- **SC-002** : [Métrique mesurable, ex. "Le système gère 1000 utilisateurs simultanés sans dégradation"]
- **SC-003** : [Métrique de satisfaction utilisateur, ex. "90% des utilisateurs complètent avec succès la tâche principale à la première tentative"]
- **SC-004** : [Métrique métier, ex. "Réduire les tickets de support liés à [X] de 50%"]

## Hypothèses

<!--
  ACTION REQUISE : Le contenu de cette section représente des placeholders.
  Les remplir avec les bonnes hypothèses basées sur des valeurs par défaut raisonnables
  choisies quand la description de fonctionnalité n'a pas spécifié certains détails.
-->

- [Hypothèse sur les utilisateurs cibles, ex. "Les utilisateurs ont une connectivité internet stable"]
- [Hypothèse sur les limites de portée, ex. "Le support mobile est hors de portée pour v1"]
- [Hypothèse sur les données/environnement, ex. "Le système d'authentification existant sera réutilisé"]
- [Dépendance sur système/service existant, ex. "Nécessite l'accès à l'API de profil utilisateur existante"]
