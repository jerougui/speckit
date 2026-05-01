# data-model.md

## Entities

### Album
- `id`: identifiant unique de l'album
- `title`: nom de l'album affiché à l'utilisateur
- `date`: date représentant le regroupement (par exemple `2026-05-01`)
- `order_index`: position de l'album sur la page principale
- `photo_count`: nombre de photos dans l'album
- `created_at`: horodatage de création
- `updated_at`: horodatage de dernière modification

### Photo
- `id`: identifiant unique de la photo
- `album_id`: référence vers l'album qui contient la photo
- `file_name`: nom de fichier ou identifiant local de la photo
- `date_taken`: date de prise de vue ou date extraite de la photo
- `thumb_url`: chemin local vers la miniature (généré côté client)
- `metadata`: métadonnées additionnelles (JSON, ex. dimensions, type MIME)
- `added_at`: horodatage d'ajout dans l'album

## Relations

- Un `Album` contient plusieurs `Photo`.
- Une `Photo` appartient à un seul `Album`.
- Les albums ne sont jamais imbriqués.

## Validation

- `Album.title` ne doit pas être vide.
- `Album.date` doit être une date valide et correspondre à la période de regroupement.
- `Photo.date_taken` doit être une date valide ou une valeur `unknown` pour les images sans date.
- `Photo.album_id` doit référencer un album existant.

## State Transitions

- Création d'un album: ajouter un enregistrement `Album` puis évaluer les photos à y associer.
- Ajout d'une photo: créer un enregistrement `Photo` et mettre à jour le compteur `Album.photo_count`.
- Réorganisation d'albums: modifier `Album.order_index` pour refléter le nouvel ordre.
- Mise à jour des métadonnées: réécrire l'enregistrement `Photo.metadata` sans changer `Photo.id`.
