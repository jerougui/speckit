# UI Contract: Album Organizer

## Purpose

Décrire le contrat entre les composants d'interface qui gèrent les albums et les photos.

## Composants

### AlbumList
- Affiche la liste des albums dans l'ordre défini par `Album.order_index`.
- Supporte le glisser-déposer pour réordonner les albums.
- Émet un événement `albumReordered` avec le nouvel ordre des `albumId`.
- Émet un événement `albumSelected` lorsque l'utilisateur ouvre un album.

### PhotoTileView
- Affiche les photos d'un album sélectionné en tuiles.
- Supporte l'ouverture d'une photo en plein écran lors du clic.
- Reçoit un ensemble de `Photo` triées par `added_at` ou par date de prise de vue.

### StorageAdapter
- Expose les opérations suivantes :
  - `getAlbums()` : renvoie la liste des albums ordonnée.
  - `getPhotos(albumId)` : renvoie les photos du `albumId`.
  - `saveAlbum(album)` : crée ou met à jour un album.
  - `savePhoto(photo)` : crée ou met à jour une photo.
  - `reorderAlbums(orderArray)` : met à jour les `order_index` des albums.
- Garantit la persistance locale via SQLite.

## Event Contracts

- `albumReordered`: payload = `{ order: [albumId1, albumId2, ...] }`
- `albumSelected`: payload = `{ albumId }`
- `photoClicked`: payload = `{ photoId }`

## Interface Constraints

- Les albums ne peuvent pas être imbriqués.
- L'ordre des albums est conservé entre les sessions.
- Les photos sont prévisualisées uniquement dans l'album actif.
- Aucune action utilisateur ne provoque l'envoi de photos hors du navigateur sans consentement.
