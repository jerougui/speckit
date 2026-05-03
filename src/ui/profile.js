export function renderProfileMenu(root, user, { onLogout, onChangePassword }) {
  if (!user) {
    root.innerHTML = '';
    return;
  }

  root.innerHTML = `
    <div class="profile-menu">
      <button id="profile-toggle" class="profile-toggle" type="button">
        ${escapeHtml(user.username)} (${escapeHtml(user.role)})
      </button>
      <div id="profile-dropdown" class="profile-dropdown hidden">
        <button id="logout-button" type="button">Se déconnecter</button>
        <hr />
        <form id="change-password-form" class="change-password-form">
          <label for="new-password">Nouveau mot de passe</label>
          <input id="new-password" type="password" required />
          <button type="submit">Changer le mot de passe</button>
        </form>
        <div id="profile-message" class="profile-message" aria-live="polite"></div>
      </div>
    </div>
  `;

  const toggle = root.querySelector('#profile-toggle');
  const dropdown = root.querySelector('#profile-dropdown');
  const logoutButton = root.querySelector('#logout-button');
  const changeForm = root.querySelector('#change-password-form');
  const message = root.querySelector('#profile-message');

  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  logoutButton.addEventListener('click', () => {
    onLogout?.();
  });

  changeForm.addEventListener('submit', async event => {
    event.preventDefault();
    const newPassword = root.querySelector('#new-password').value;
    message.textContent = '';
    const response = await onChangePassword?.(newPassword);
    if (response?.success) {
      message.textContent = 'Mot de passe mis à jour.';
      changeForm.reset();
    } else {
      message.textContent = response?.error || 'Erreur lors du changement de mot de passe.';
    }
  });
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/\'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
