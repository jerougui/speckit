import { initSqlite, execute, all } from './lib/sqlite-adapter.js';
import { AlbumStore } from './lib/album-store.js';
import { PhotoModel } from './lib/photo-model.js';
import { renderAlbumList } from './ui/album-list.js';
import { renderPhotoGrid, bindPhotoPreview, closePreview } from './ui/photo-tile-view.js';
import { setupDragDrop } from './ui/drag-drop.js';

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
  const photos = await photoModel.getPhotos(albumId);
  renderPhotoGrid(photos, showPhotoPreview);
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
    return;
  }

  const files = Array.from(event.target.files || []);
  for (const file of files) {
    const photo = await photoModel.createPhotoFromFile(file, selectedAlbumId);
    await photoModel.savePhoto(photo);
  }

  const photos = await photoModel.getPhotos(selectedAlbumId);
  renderPhotoGrid(photos, showPhotoPreview);
  photoInput.value = null;
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
