# Contrat UI : Authentification Utilisateur

## Objectif

Décrire le contrat entre les composants UI qui gèrent l'authentification utilisateur, la connexion, et la gestion des utilisateurs.

## Composants

### LoginComponent
- Affiche le formulaire de connexion avec champs nom d'utilisateur et mot de passe
- Valide les entrées (champs non vides)
- Appelle auth.login() à la soumission du formulaire
- Affiche les messages d'erreur pour les connexions échouées
- Redirige vers l'app principale en cas de connexion réussie
- Affiche l'état de chargement pendant l'authentification

### UserManagementComponent
- S'affiche uniquement quand l'utilisateur actuel a le rôle 'admin'
- Affiche la liste de tous les utilisateurs (nom d'utilisateur, rôle)
- Fournit un formulaire pour ajouter de nouveaux utilisateurs (nom d'utilisateur, mot de passe, rôle)
- Fournit des boutons de suppression pour chaque utilisateur (sauf l'utilisateur actuel)
- Appelle auth.addUser() et auth.deleteUser()
- Met à jour la liste après les opérations
- Affiche les messages de succès/erreur

### ProfileComponent
- Affiche l'icône de profil dans l'en-tête de l'app quand l'utilisateur est connecté
- Affiche un menu déroulant avec l'option "Change Password"
- Ouvre la boîte de dialogue de changement de mot de passe
- Appelle auth.changePassword() à la soumission
- Affiche les messages de succès/erreur

### AppRouter
- Vérifie l'état d'auth au chargement de l'app
- Affiche LoginComponent si non authentifié
- Affiche l'app principale si authentifié
- Gère la déconnexion en effaçant l'auth et affichant la connexion
- Écoute les changements d'état d'authentification

## Contrats d'Événements

- `authStateChanged` : payload = `{ user: User | null }` - émis quand une connexion/déconnexion se produit
- `userAdded` : payload = `{ user: User }` - émis après création d'utilisateur réussie
- `userDeleted` : payload = `{ userId: number }` - émis après suppression d'utilisateur réussie
- `passwordChanged` : payload = `{}` - émis après changement de mot de passe réussi

## Contraintes d'Interface

- La page de connexion est la vue par défaut quand non authentifié
- Les fonctionnalités admin (gestion des utilisateurs) uniquement visibles aux utilisateurs admin
- L'icône de profil uniquement visible aux utilisateurs authentifiés
- Les champs de mot de passe utilisent input type="password"
- Toutes les opérations sont asynchrones avec indicateurs de chargement
- Les messages d'erreur sont conviviaux et ne révèlent pas d'informations sensibles
- Aucun contournement d'authentification possible via manipulation UI</content>
<parameter name="filePath">C:\ENVDEV\depot\speckit\specs\002-user-auth\contracts\ui-contract.md