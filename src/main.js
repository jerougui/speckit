import { initSqlite, execute, all } from './lib/sqlite-adapter.js';
import { AlbumStore } from './lib/album-store.js';
import { PhotoModel } from './lib/photo-model.js';
import { renderAlbumList } from './ui/album-list.js';
import { renderPhotoGrid, bindPhotoPreview, closePreview } from './ui/photo-tile-view.js';
import { setupDragDrop } from './ui/drag-drop.js';

// Configuration
const CONFIG = {
  photoStoragePath: './albums' // Dossier où organiser les photos par album
};

const albumForm = document.getElementById('album-form');
const albumTitleInput = document.getElementById('album-title');
const albumDateInput = document.getElementById('album-date');
const albumListRoot = document.getElementById('album-list');
const photoInput = document.getElementById('photo-input');
const selectedAlbumLabel = document.getElementById('selected-album-label');
const photoModal = document.getElementById('photo-modal');
const closeModalButton = document.getElementById('close-modal');

let albumStore;
let photoModel;
let selectedAlbumId = null;
let currentAlbums = [];

async function initApp() {
  await initSqlite();
  albumStore = new AlbumStore({ execute, all });
  photoModel = new PhotoModel({ execute, all });

  await albumStore.init();
  await photoModel.init();

  currentAlbums = await albumStore.getAlbums();
  renderAlbums();
  setupDragDrop(albumListRoot, handleAlbumReorder);
  bindPhotoPreview(photoModal, closeModalButton);
  updateSelectedAlbumLabel();
}

function renderAlbums() {
  renderAlbumList(albumListRoot, currentAlbums, selectedAlbumId, {
    onSelect: handleAlbumSelect,
    onDelete: handleAlbumDelete
  });
}

function updateSelectedAlbumLabel() {
  if (!selectedAlbumId) {
    selectedAlbumLabel.textContent = 'Sélectionnez un album pour ajouter des photos';
    return;
  }

  const album = currentAlbums.find(a => a.id === selectedAlbumId);
  selectedAlbumLabel.textContent = album ? `Album sélectionné : ${album.title}` : 'Sélectionnez un album pour ajouter des photos';
}

async function handleAlbumSelect(albumId) {
  selectedAlbumId = albumId;
  renderAlbums();
  updateSelectedAlbumLabel();

  // Nettoyer les URLs d'objet de l'album précédent
  await photoModel.cleanup();

  const photos = await photoModel.getPhotos(albumId);
  renderPhotoGrid(photos, showPhotoPreview);

  // Si pas de photos affichables (URLs blob perdues après refresh), informer l'utilisateur
  if (photos.length > 0 && photos.every(p => !p.data_url || p.data_url.startsWith('blob:'))) {
    console.warn('Les images ne sont pas persistées après un refresh de page. Re-sélectionnez l\'album pour les recharger.');
  }
}

async function handleAlbumDelete(albumId) {
  await albumStore.deleteAlbum(albumId);
  currentAlbums = await albumStore.getAlbums();
  if (selectedAlbumId === albumId) {
    selectedAlbumId = null;
    renderPhotoGrid([], showPhotoPreview);
  }
  renderAlbums();
  updateSelectedAlbumLabel();
}

async function handleAlbumReorder(orderIds) {
  await albumStore.reorderAlbums(orderIds);
  currentAlbums = await albumStore.getAlbums();
  renderAlbums();
}

albumForm.addEventListener('submit', async event => {
  event.preventDefault();
  const title = albumTitleInput.value.trim();
  const date = albumDateInput.value;
  if (!title || !date) {
    return;
  }

  await albumStore.saveAlbum({ title, date });
  currentAlbums = await albumStore.getAlbums();
  albumTitleInput.value = '';
  albumDateInput.value = '';
  renderAlbums();
});

photoInput.addEventListener('change', async event => {
  if (!selectedAlbumId) {
    alert('Sélectionnez d’abord un album avant d’ajouter des photos.');
    event.target.value = null;
    return;
  }

  const files = Array.from(event.target.files || []);

  try {
    // Organiser et copier les photos dans le dossier de l'album
    const organizedPhotos = await photoModel.organizePhotosForAlbum(selectedAlbumId, files);

    // Sauvegarder chaque photo organisée
    for (const photo of organizedPhotos) {
      await photoModel.savePhoto(photo);
    }

    const photos = await photoModel.getPhotos(selectedAlbumId);
    renderPhotoGrid(photos, showPhotoPreview);
    photoInput.value = null;

    // Mettre à jour l'affichage des albums pour refléter le nouveau nombre de photos
    currentAlbums = await albumStore.getAlbums();
    renderAlbums();

    alert(`${organizedPhotos.length} photo(s) ajoutée(s) et organisée(s) dans le dossier de l'album.`);
  } catch (error) {
    console.error('Erreur lors de l\'organisation des photos:', error);
    alert('Erreur lors de l\'organisation des photos. Elles ont été ajoutées pour affichage seulement.');
  }
});

function showPhotoPreview(photo) {
  const modalImage = document.getElementById('modal-image');
  modalImage.src = photo.data_url;
  modalImage.alt = photo.file_name;
  photoModal.classList.remove('hidden');
}

closeModalButton.addEventListener('click', () => {
  closePreview(photoModal);
});

photoModal.addEventListener('click', event => {
  if (event.target === photoModal) {
    closePreview(photoModal);
  }
});

initApp().catch(error => {
  console.error('Erreur d’initialisation de l’application', error);
});

// Nettoyer les URLs d'objet quand on quitte la page
window.addEventListener('beforeunload', () => {
  photoModel?.cleanup();
});
