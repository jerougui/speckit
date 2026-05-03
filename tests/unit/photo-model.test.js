import { describe, it, expect } from 'vitest';
import { PhotoModel } from '../../src/lib/photo-model.js';

const execute = () => {};
const all = () => [];

describe('PhotoModel', () => {
  it('should create photo from file with correct metadata', async () => {
    const model = new PhotoModel({ execute, all });
    const file = new File([''], 'image.jpg', { type: 'image/jpeg', lastModified: Date.now() });
    const photo = await model.createPhotoFromFile(file, 'album-1');

    expect(photo.album_id).toBe('album-1');
    expect(photo.file_name).toBe('image.jpg');
    expect(photo.id).toBeDefined();
    expect(photo.date_taken).toBeDefined();
    expect(photo.metadata).toBeDefined();
    expect(photo.metadata.type).toBe('image/jpeg');
    expect(photo.file).toBe(file);
  });
});
