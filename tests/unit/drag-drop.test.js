import { describe, it, expect, vi } from 'vitest';
import { setupDragDrop } from '../../src/ui/drag-drop.js';

describe('Drag and Drop', () => {
  it('should call onReorder when an item is dropped', () => {
    const root = document.createElement('div');
    const card1 = document.createElement('div');
    card1.className = 'album-card';
    card1.dataset.albumId = 'a';
    card1.draggable = true;
    const card2 = document.createElement('div');
    card2.className = 'album-card';
    card2.dataset.albumId = 'b';
    card2.draggable = true;
    root.append(card1, card2);

    const onReorder = vi.fn();
    setupDragDrop(root, onReorder);

    const dragStart = new Event('dragstart', { bubbles: true });
    Object.defineProperty(dragStart, 'dataTransfer', {
      value: { effectAllowed: '', setData: () => {} }
    });
    card1.dispatchEvent(dragStart);

    const dropEvent = new Event('drop', { bubbles: true });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { getData: () => 'a' }
    });
    card2.dispatchEvent(dropEvent);

    expect(onReorder).toHaveBeenCalled();
  });
});
