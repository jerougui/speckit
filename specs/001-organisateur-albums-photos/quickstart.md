# quickstart.md

## Installation

1. Depuis la racine du dépôt, installez les dépendances du projet :

```bash
npm install
```

2. Assurez-vous que `vite` est disponible dans `devDependencies`.

## Exécution

1. Lancez le serveur de développement Vite :

```bash
npm run dev
```

2. Ouvrez le navigateur sur l'URL fournie par Vite (généralement `http://localhost:5173`).

## Utilisation

- Importez des photos depuis votre disque local.
- Les albums sont créés et groupés automatiquement par date.
- Faites glisser un album pour changer son ordre sur la page principale.
- Ouvrez un album pour voir les photos en mode tuiles.

## Notes de Sécurité

- Aucune photo n'est envoyée vers un service distant.
- Toutes les métadonnées restent dans la base SQLite locale.
- L'application est conçue pour fonctionner uniquement sur l'appareil de l'utilisateur.
