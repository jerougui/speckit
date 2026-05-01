import { describe, it, expect } from 'vitest';
import { renderAlbumList } from '../../src/ui/album-list.js';

describe('Album UI', () => {
  it('renders album list with selected state', () => {
    const root = document.createElement('div');
    const albums = [
      { id: '1', title: 'Album 1', date: '2026-05-01', photo_count: 3 },
      { id: '2', title: 'Album 2', date: '2026-06-01', photo_count: 0 }
    ];
    renderAlbumList(root, albums, '2', {
      onSelect: () => {},
      onDelete: () => {}
    });

    expect(root.querySelectorAll('.album-card')).toHaveLength(2);
    expect(root.querySelector('.album-card.selected')).not.toBeNull();
  });
});
