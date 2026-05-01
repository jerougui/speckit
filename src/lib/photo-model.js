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
  }

  async init() {
    return true;
  }

  async savePhoto(photo) {
    const addedAt = new Date().toISOString();
    const metadata = JSON.stringify(photo.metadata || {});

    this.execute(
      `INSERT INTO photos (id, album_id, file_name, data_url, date_taken, metadata, added_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [photo.id, photo.album_id, photo.file_name, photo.data_url, photo.date_taken, metadata, addedAt]
    );
  }

  async getPhotos(albumId) {
    return this.all(`SELECT * FROM photos WHERE album_id = ? ORDER BY added_at ASC`, [albumId]);
  }

  async createPhotoFromFile(file, albumId) {
    const dataUrl = await this.readFileAsDataUrl(file);

    return {
      id: makeId(),
      album_id: albumId,
      file_name: file.name,
      data_url: dataUrl,
      date_taken: formatDate(file.lastModified),
      metadata: metadataFromFile(file)
    };
  }

  readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
