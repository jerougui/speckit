import { describe, it, expect, beforeEach } from 'vitest';
import { AlbumStore } from '../../src/lib/album-store.js';

const mockData = [];
const execute = (sql, params) => {
  mockData.push({ sql, params });
};
const all = () => [{ id: 'album-1', title: 'Test', date: '2026-05-01', order_index: 1, photo_count: 0 }];

describe('AlbumStore', () => {
  let store;

  beforeEach(() => {
    store = new AlbumStore({ execute, all });
  });

  it('should create a new album with title and date', async () => {
    const id = await store.saveAlbum({ title: 'Vacances', date: '2026-05-01' });
    expect(typeof id).toBe('string');
    expect(mockData[0].sql).toContain('INSERT INTO albums');
  });

  it('should retrieve albums ordered by order_index', async () => {
    const albums = await store.getAlbums();
    expect(albums).toHaveLength(1);
    expect(albums[0].title).toBe('Test');
  });
});
