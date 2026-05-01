import { describe, it, expect } from 'vitest';
import { PhotoModel } from '../../src/lib/photo-model.js';

const execute = () => {};
const all = () => [];

describe('PhotoModel', () => {
  it('should format unknown dates correctly', async () => {
    const model = new PhotoModel({ execute, all });
    const photo = await model.createPhotoFromFile(
      new File([''], 'image.jpg', { type: 'image/jpeg', lastModified: Date.now() }),
      'album-1'
    );
    expect(photo.album_id).toBe('album-1');
    expect(photo.file_name).toBe('image.jpg');
    expect(photo.data_url).toContain('data:image/jpeg');
  });
});
