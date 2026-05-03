function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatDate(input) {
  if (!input) {
    return 'unknown';
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return 'unknown';
  }

  return date.toISOString().slice(0, 10);
}

function metadataFromFile(file) {
  return {
    size: file.size,
    type: file.type,
    name: file.name,
    lastModified: file.lastModified
  };
}

export class PhotoModel {
  constructor({ execute, all }) {
    this.execute = execute;
    this.all = all;
    this.objectUrls = new Map();
  }

  async init() {
    this.idb = await this.openPhotoStorage();
    return true;
  }

  async openPhotoStorage() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('photo-storage', 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files');
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async savePhoto(photo) {
    const addedAt = new Date().toISOString();
    const metadata = JSON.stringify(photo.metadata || {});

    this.execute(
      `INSERT INTO photos (id, album_id, file_name, data_url, date_taken, metadata, added_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [photo.id, photo.album_id, photo.file_name, null, photo.date_taken, metadata, addedAt]
    );

    // Sauvegarder le fichier pour persistence
    if (photo.file) {
      await this.savePhotoFile(photo.id, photo.file);
    }

    // Créer l'URL d'objet pour l'affichage immédiat
    const objectUrl = await this.createObjectUrl(photo.id);
    if (objectUrl) {
      this.objectUrls.set(photo.id, objectUrl);
    }
  }

  async savePhotoFile(photoId, file) {
    const tx = this.idb.transaction('files', 'readwrite');
    const store = tx.objectStore('files');
    return new Promise((resolve, reject) => {
      const request = store.put(file, photoId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getPhotoFile(photoId) {
    const tx = this.idb.transaction('files', 'readonly');
    const store = tx.objectStore('files');
    return new Promise((resolve, reject) => {
      const request = store.get(photoId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async createObjectUrl(photoId) {
    const file = await this.getPhotoFile(photoId);
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }

  async getPhotos(albumId) {
    const rows = this.all(`SELECT * FROM photos WHERE album_id = ? ORDER BY added_at ASC`, [albumId]);

    const photos = [];
    for (const row of rows) {
      let data_url = this.objectUrls.get(row.id);
      if (!data_url) {
        data_url = await this.createObjectUrl(row.id);
        if (data_url) {
          this.objectUrls.set(row.id, data_url);
        }
      }

      if (data_url) {
        photos.push({
          ...row,
          data_url
        });
      }
    }

    return photos;
  }

  async organizePhotosForAlbum(albumId, files) {
    // Vérifier si l'API File System Access est supportée
    if (!('showDirectoryPicker' in window)) {
      console.warn('API File System Access non supportée. Utilisation du mode affichage seulement.');
      // Fallback: créer les photos avec sauvegarde en IndexedDB seulement
      return Promise.all(files.map(file => this.createPhotoFromFile(file, albumId)));
    }

    try {
      // Demander à l'utilisateur de choisir un dossier
      const dirHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
        startIn: 'downloads'
      });

      // Créer le sous-dossier de l'album
      const albumDirHandle = await dirHandle.getDirectoryHandle(albumId, { create: true });

      const organizedPhotos = [];

      for (const file of files) {
        // Copier le fichier dans le dossier de l'album
        const fileHandle = await albumDirHandle.getFileHandle(file.name, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(file);
        await writable.close();

        // Créer la photo avec sauvegarde en IndexedDB pour persistence
        const photo = await this.createPhotoFromFile(file, albumId);
        organizedPhotos.push(photo);
      }

      return organizedPhotos;
    } catch (error) {
      console.error('Erreur lors de l\'organisation des photos:', error);
      // Fallback: créer quand même les photos avec sauvegarde en IndexedDB seulement
      return Promise.all(files.map(file => this.createPhotoFromFile(file, albumId)));
    }
  }

  async createPhotoFromFile(file, albumId) {
    return {
      id: makeId(),
      album_id: albumId,
      file_name: file.name,
      date_taken: formatDate(file.lastModified),
      metadata: metadataFromFile(file),
      file // Garder le fichier pour sauvegarde
    };
  }

  async deletePhoto(photoId) {
    const objectUrl = this.objectUrls.get(photoId);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      this.objectUrls.delete(photoId);
    }

    this.execute(`DELETE FROM photos WHERE id = ?`, [photoId]);
  }

  async cleanup() {
    for (const url of this.objectUrls.values()) {
      URL.revokeObjectURL(url);
    }
    this.objectUrls.clear();
  }
}
