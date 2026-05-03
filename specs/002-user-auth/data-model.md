# Modèle de Données : Module d'Authentification Utilisateur

## Entités

### Entité User

Représente un utilisateur système avec des identifiants d'authentification et un accès basé sur les rôles.

**Champs** :
- `id` : INTEGER PRIMARY KEY - Identifiant unique, auto-incrémenté
- `username` : TEXT UNIQUE NOT NULL - Nom d'utilisateur de connexion, sensible à la casse
- `password_hash` : TEXT NOT NULL - Mot de passe haché avec bcrypt et sel
- `role` : TEXT NOT NULL - Rôle utilisateur ('user' ou 'admin')

**Règles de Validation** :
- Nom d'utilisateur : 3-50 caractères, alphanumérique + trait de soulignement/tiret, unique
- Mot de passe : Minimum 6 caractères (avant hachage)
- Rôle : Doit être soit 'user' soit 'admin'

**Transitions d'État** :
- Création : Nouvel utilisateur créé par l'admin avec mot de passe initial
- Mise à Jour Mot de Passe : L'utilisateur peut changer son propre mot de passe
- Suppression : L'admin peut supprimer des utilisateurs (sauf lui-même)

**Relations** :
- Aucune (entité autonome pour l'authentification)

## Schéma de Base de Données

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'admin'))
);
```

## Données Initiales

Au premier lancement de l'application, si la table users est vide :
- Insérer utilisateur admin : username='admin', password_hash=hash('admin'), role='admin'

## Contraintes

- Aucune relation de clé étrangère (l'auth est indépendante)
- Les mots de passe ne sont jamais stockés en texte clair
- Accès basé sur les rôles appliqué au niveau application</content>
<parameter name="filePath">C:\ENVDEV\depot\speckit\specs\002-user-auth\data-model.md