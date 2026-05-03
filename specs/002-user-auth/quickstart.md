# Démarrage Rapide : Module d'Authentification Utilisateur

## Vue d'Ensemble

Le module d'authentification utilisateur ajoute l'authentification login/mot de passe, la gestion des utilisateurs admin, et la gestion des profils à l'application d'organisation d'albums photo.

## Premier Lancement

1. **Installer les dépendances** :
   ```bash
   npm install bcryptjs
   ```

2. **Démarrer l'application** :
   ```bash
   npm run dev
   ```

3. **Connexion initiale** :
   - Au premier lancement, le système crée automatiquement un compte admin
   - Nom d'utilisateur : `admin`
   - Mot de passe : `admin`
   - Connectez-vous avec ces identifiants

## Fonctionnalités

### Connexion
- Accédez à l'application sur `http://localhost:5173`
- Saisissez le nom d'utilisateur et le mot de passe
- Cliquez sur "Login" ou appuyez sur Entrée

### Gestion des Utilisateurs Admin
- Après vous être connecté en tant qu'admin, cliquez sur "User Management" dans la navigation
- Visualisez la liste de tous les utilisateurs
- Ajoutez de nouveaux utilisateurs en remplissant le formulaire (nom d'utilisateur, mot de passe, rôle)
- Supprimez des utilisateurs en cliquant sur le bouton de suppression à côté de leur nom
- Note : Vous ne pouvez pas supprimer votre propre compte

### Gestion des Profils
- Lorsque vous êtes connecté, cliquez sur l'icône de profil (👤) en haut à droite
- Sélectionnez "Change Password"
- Saisissez le nouveau mot de passe et confirmez
- Le mot de passe est mis à jour immédiatement

## Développement

### Exécuter les Tests
```bash
npm test
```

### Construction pour la Production
```bash
npm run build
```

## Notes de Sécurité

- Les mots de passe sont hachés de manière sécurisée en utilisant bcrypt
- L'état d'authentification persiste entre les sessions navigateur
- Les fonctionnalités admin sont protégées par vérification de rôle
- Toute l'authentification se déroule côté client dans le navigateur

## Dépannage

- **Impossible de se connecter** : Vérifiez que le nom d'utilisateur/mot de passe sont corrects (sensible à la casse)
- **Pas d'accès admin** : Assurez-vous d'être connecté avec le rôle admin
- **Icône de profil non visible** : Assurez-vous d'être connecté
- **Erreurs de base de données** : Effacez le localStorage du navigateur et actualisez</content>
<parameter name="filePath">C:\ENVDEV\depot\speckit\specs\002-user-auth\quickstart.md