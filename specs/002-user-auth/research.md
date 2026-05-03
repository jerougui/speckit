# Résultats de Recherche : Module d'Authentification Utilisateur

## Décisions

### Décision 1 : Bibliothèque de Hachage des Mots de Passe
**Choisi** : bcryptjs (implémentation bcrypt pure JavaScript)  
**Justification** : Fournit un hachage sécurisé des mots de passe avec génération automatique de sel. Fonctionne dans l'environnement navigateur sans dépendances externes au-delà de npm. Suit le standard bcrypt qui est largement utilisé et éprouvé au combat.  
**Alternatives Considérées** : 
- API Web Crypto avec PBKDF2 : Plus complexe à implémenter, nécessite une gestion manuelle du sel, moins standard pour les mots de passe.
- crypto-js : Paramètres par défaut moins sécurisés, pas spécifiquement conçu pour les mots de passe.
- Aucun hachage : Rejeté pour des raisons de sécurité.

### Décision 2 : Gestion des Sessions
**Choisi** : localStorage pour stocker l'utilisateur connecté (nom d'utilisateur et rôle)  
**Justification** : Simple, persistant entre les rechargements de page, cohérent avec l'architecture côté client. Facile à implémenter et tester.  
**Alternatives Considérées** :
- sessionStorage : Se réinitialise à la fermeture de l'onglet, moins pratique pour les utilisateurs.
- État en mémoire : Se réinitialise au rechargement de page, nécessite une reconnexion fréquente.
- Cookies : Complexité inutile pour une app côté client.

### Décision 3 : Intégration Architecture UI
**Choisi** : Étendre le modèle UI JavaScript vanilla existant avec des composants pilotés par événements  
**Justification** : Maintient la cohérence avec la base de code existante (album-list.js, drag-drop.js). Préserve la simplicité pragmatique selon la constitution. État d'auth géré via des événements personnalisés.  
**Alternatives Considérées** :
- Introduire React/Vue : Nécessiterait une refactorisation majeure, viole le principe de simplicité.
- Routeur d'auth séparé : Surdimensionné pour une petite app.

### Décision 4 : Schéma de Base de Données pour les Utilisateurs
**Choisi** : Table users unique avec colonnes : id (INTEGER PRIMARY KEY), username (TEXT UNIQUE), password_hash (TEXT), role (TEXT : 'user' ou 'admin')  
**Justification** : Schéma simple correspondant aux exigences. Utilise le modèle d'adaptateur SQLite existant. Rôle en tant que chaîne pour la flexibilité.  
**Alternatives Considérées** :
- Table rôles séparée : Normalisation inutile pour un petit nombre d'utilisateurs.
- Stockage JSON : Requêtes moins efficaces.

### Décision 5 : Création de Compte Admin Initial
**Choisi** : Vérifier au démarrage de l'app ; si aucun utilisateur n'existe, créer le compte admin/admin  
**Justification** : Correspond aux exigences de spécification. Configuration automatique pour le premier lancement.  
**Alternatives Considérées** :
- Configuration manuelle : Moins conviviale pour l'utilisateur.
- Variables d'environnement : Surdimensionné pour côté client.

### Décision 6 : Sécurité de Réinitialisation du Mot de Passe
**Choisi** : Changement de mot de passe simple pour les utilisateurs connectés (pas de réinitialisation par email)  
**Justification** : Côté client uniquement, pas d'infrastructure email. Les utilisateurs peuvent changer leurs propres mots de passe de manière sécurisée.  
**Alternatives Considérées** :
- Réinitialisation par email : Nécessite un backend, viole la contrainte côté client.
- Aucune réinitialisation : Échoue à l'exigence de l'histoire utilisateur.

## Considérations de Sécurité

- **Limitations Côté Client** : Les mots de passe sont hachés mais stockés dans la base de données locale du navigateur. Quiconque ayant accès au système de fichiers du stockage navigateur peut accéder aux mots de passe hachés. Ceci est inhérent aux apps côté client et acceptable pour des fins de démonstration.
- **Pas de HTTPS** : En production, nécessiterait HTTPS pour prévenir les attaques man-in-the-middle, mais pas applicable ici.
- **Force du Mot de Passe** : Validation de base (longueur minimum), pas d'exigences de complexité pour rester simple.
- **Gestion des Connexions Échouées** : Messages d'erreur simples, pas de mécanisme de verrouillage pour éviter la complexité.

## Analyse de Performance

- **Temps de Connexion** : Le hachage bcrypt prend ~100-500ms dans le navigateur, bien dans les 3 secondes requises.
- **Stockage** : SQLite avec petite table utilisateurs (<1MB pour des centaines d'utilisateurs).
- **Mémoire** : Utilisation mémoire supplémentaire minimale.

## Modèles d'Intégration

- **État d'Auth** : Objet d'état d'auth global avec fonctions de connexion/déconnexion.
- **Gardes UI** : Les composants vérifient l'état d'auth avant de rendre les fonctionnalités admin.
- **Système d'Événements** : Utiliser CustomEvent pour les changements d'état d'auth (connexion, déconnexion).</content>
<parameter name="filePath">C:\ENVDEV\depot\speckit\specs\002-user-auth\research.md