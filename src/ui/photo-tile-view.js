export function renderPhotoGrid(photos, onPhotoClick) {
  const grid = document.getElementById('photo-grid');
  grid.innerHTML = '';

  if (!photos || photos.length === 0) {
    grid.innerHTML = '<p class="empty-state">Aucune photo à afficher. Ajoutez des photos à l’album sélectionné.</p>';
    return;
  }

  photos.forEach(photo => {
    const tile = document.createElement('article');
    tile.className = 'photo-tile';
    tile.tabIndex = 0;
    tile.innerHTML = `
      <img src="${escapeHtml(photo.data_url)}" alt="${escapeHtml(photo.file_name)}" />
      <div class="photo-label">${escapeHtml(photo.file_name)}</div>
    `;

    tile.addEventListener('click', () => onPhotoClick?.(photo));
    tile.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onPhotoClick?.(photo);
      }
    });

    grid.appendChild(tile);
  });
}

export function bindPhotoPreview(modal, closeButton) {
  if (!modal || !closeButton) {
    return;
  }

  closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

export function closePreview(modal) {
  modal.classList.add('hidden');
}

function escapeHtml(text) {
  return text.replace(/["&'<>]/g, tag => ({
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;'
  }[tag]));
}
