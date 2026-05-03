# Contrat : API Bibliothèque d'Authentification

## Vue d'Ensemble

La bibliothèque d'authentification fournit des fonctionnalités d'authentification et de gestion des utilisateurs côté client. Elle expose des fonctions pures pour les opérations d'authentification et gère l'état utilisateur via localStorage.

## API Publique

### Fonctions d'Authentification

#### `login(username: string, password: string): Promise<{success: boolean, user?: User, error?: string}>`

Authentifie un utilisateur avec nom d'utilisateur et mot de passe.

**Paramètres** :
- `username` : string - Le nom de connexion de l'utilisateur
- `password` : string - Le mot de passe de l'utilisateur (en texte clair)

**Retourne** : Promise se résolvant en :
- `success` : boolean - true si la connexion réussit
- `user` : Objet User si réussi (id, username, role)
- `error` : string si échoué (identifiants invalides, etc.)

**Effets de Bord** : Définit localStorage 'auth_user' si réussi

#### `logout(): void`

Déconnecte l'utilisateur actuel.

**Effets de Bord** : Efface localStorage 'auth_user'

#### `getCurrentUser(): User | null`

Retourne l'utilisateur actuellement connecté ou null.

**Retourne** : Objet User ou null

### Fonctions de Gestion des Utilisateurs (Admin Uniquement)

#### `addUser(username: string, password: string, role: 'user' | 'admin'): Promise<{success: boolean, error?: string}>`

Crée un nouveau compte utilisateur.

**Paramètres** :
- `username` : string - Le nom de connexion du nouvel utilisateur
- `password` : string - Mot de passe en texte clair (sera haché)
- `role` : 'user' | 'admin' - Rôle utilisateur

**Retourne** : Promise avec succès/erreur

**Exigences** : L'utilisateur actuel doit être admin

#### `deleteUser(userId: number): Promise<{success: boolean, error?: string}>`

Supprime un compte utilisateur.

**Paramètres** :
- `userId` : number - ID de l'utilisateur à supprimer

**Retourne** : Promise avec succès/erreur

**Exigences** : L'utilisateur actuel doit être admin, ne peut pas se supprimer lui-même

#### `listUsers(): Promise<{success: boolean, users?: User[], error?: string}>`

Liste tous les utilisateurs.

**Retourne** : Promise avec tableau d'objets User

**Exigences** : L'utilisateur actuel doit être admin

#### `changePassword(newPassword: string): Promise<{success: boolean, error?: string}>`

Change le mot de passe de l'utilisateur actuel.

**Paramètres** :
- `newPassword` : string - Nouveau mot de passe en texte clair

**Retourne** : Promise avec succès/erreur

### Types

```javascript
interface User {
  id: number;
  username: string;
  role: 'user' | 'admin';
}
```

## Dépendances

- Nécessite une base de données SQLite initialisée avec la table users
- Dépend de bcryptjs pour le hachage des mots de passe
- Utilise localStorage pour la persistance des sessions

## Gestion d'Erreurs

Toutes les fonctions retournent des messages d'erreur structurés plutôt que de lever des exceptions. Les erreurs incluent :
- 'INVALID_CREDENTIALS'
- 'USER_NOT_FOUND'
- 'USERNAME_EXISTS'
- 'PERMISSION_DENIED'
- 'CANNOT_DELETE_SELF'
- 'DATABASE_ERROR'</content>
<parameter name="filePath">C:\ENVDEV\depot\speckit\specs\002-user-auth\contracts\auth-api-contract.md