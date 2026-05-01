export function renderAlbumList(root, albums, selectedAlbumId, callbacks) {
  root.innerHTML = '';

  if (albums.length === 0) {
    root.innerHTML = '<p class="empty-state">Aucun album créé pour le moment.</p>';
    return;
  }

  albums.forEach(album => {
    const card = document.createElement('article');
    card.className = `album-card${album.id === selectedAlbumId ? ' selected' : ''}`;
    card.draggable = true;
    card.dataset.albumId = album.id;

    card.innerHTML = `
      <div>
        <h3 class="album-title">${escapeHtml(album.title)}</h3>
        <div class="album-meta">
          <span>Date: ${escapeHtml(album.date)}</span>
          <span>Photos: ${album.photo_count || 0}</span>
        </div>
      </div>
      <button class="delete-button" aria-label="Supprimer l'album">Supprimer</button>
    `;

    card.addEventListener('click', event => {
      if (event.target.matches('.delete-button')) {
        event.stopPropagation();
        callbacks.onDelete?.(album.id);
        return;
      }
      callbacks.onSelect?.(album.id);
    });

    root.appendChild(card);
  });
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
