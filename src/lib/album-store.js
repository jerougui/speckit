function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeDate(date) {
  const value = typeof date === 'string' ? date : date.toISOString();
  return value.slice(0, 10);
}

function timestamp() {
  return new Date().toISOString();
}

export class AlbumStore {
  constructor({ execute, all }) {
    this.execute = execute;
    this.all = all;
  }

  async init() {
    return true;
  }

  async saveAlbum(album) {
    const date = normalizeDate(album.date);
    const now = timestamp();
    if (album.id) {
      this.execute(
        `UPDATE albums SET title = ?, date = ?, updated_at = ? WHERE id = ?`,
        [album.title, date, now, album.id]
      );
      return album.id;
    }

    const orderIndex = this.getNextOrderIndex();
    const id = makeId();
    this.execute(
      `INSERT INTO albums (id, title, date, order_index, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, album.title, date, orderIndex, now, now]
    );
    return id;
  }

  getNextOrderIndex() {
    const rows = this.all(`SELECT MAX(order_index) as maxIndex FROM albums`);
    const maxIndex = rows.length ? rows[0].maxIndex : null;
    return maxIndex !== null ? maxIndex + 1 : 1;
  }

  async getAlbums() {
    return this.all(`SELECT albums.*, COUNT(photos.id) AS photo_count FROM albums LEFT JOIN photos ON photos.album_id = albums.id GROUP BY albums.id ORDER BY albums.order_index ASC`);
  }

  async reorderAlbums(orderIds) {
    orderIds.forEach((id, index) => {
      this.execute(`UPDATE albums SET order_index = ? WHERE id = ?`, [index + 1, id]);
    });
  }

  async deleteAlbum(id) {
    this.execute(`DELETE FROM photos WHERE album_id = ?`, [id]);
    this.execute(`DELETE FROM albums WHERE id = ?`, [id]);
  }
}
