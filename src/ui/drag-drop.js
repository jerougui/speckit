export function setupDragDrop(root, onReorder) {
  let draggedId = null;

  root.addEventListener('dragstart', event => {
    const card = event.target.closest('.album-card');
    if (!card) {
      return;
    }
    draggedId = card.dataset.albumId;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', draggedId);
    card.classList.add('dragging');
  });

  root.addEventListener('dragend', event => {
    const card = event.target.closest('.album-card');
    if (card) {
      card.classList.remove('dragging');
    }
    draggedId = null;
  });

  root.addEventListener('dragover', event => {
    event.preventDefault();
    const target = event.target.closest('.album-card');
    if (!target || !draggedId) {
      return;
    }
    target.classList.add('drag-over');
  });

  root.addEventListener('dragleave', event => {
    const target = event.target.closest('.album-card');
    if (target) {
      target.classList.remove('drag-over');
    }
  });

  root.addEventListener('drop', event => {
    event.preventDefault();
    const target = event.target.closest('.album-card');
    if (!target || !draggedId) {
      return;
    }

    const targetId = target.dataset.albumId;
    target.classList.remove('drag-over');

    if (targetId === draggedId) {
      return;
    }

    const cards = Array.from(root.querySelectorAll('.album-card'));
    const orderIds = cards.map(card => card.dataset.albumId);
    const draggedIndex = orderIds.indexOf(draggedId);
    const targetIndex = orderIds.indexOf(targetId);

    orderIds.splice(draggedIndex, 1);
    orderIds.splice(targetIndex, 0, draggedId);

    onReorder?.(orderIds);
  });
}
