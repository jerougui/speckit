export function renderUserManagement(root, { users, onAddUser, onDeleteUser }) {
  const rows = users.map(user => {
    return `
      <tr>
        <td>${escapeHtml(user.username)}</td>
        <td>${escapeHtml(user.role)}</td>
        <td>
          <button type="button" class="delete-user-button" data-user-id="${user.id}">Supprimer</button>
        </td>
      </tr>
    `;
  }).join('');

  root.innerHTML = `
    <div class="panel user-management-panel">
      <h2>Gestion des utilisateurs</h2>
      <form id="add-user-form" class="user-management-form">
        <label for="new-user-username">Nom d'utilisateur</label>
        <input id="new-user-username" name="username" type="text" required />

        <label for="new-user-password">Mot de passe</label>
        <input id="new-user-password" name="password" type="password" required />

        <label for="new-user-role">Profil</label>
        <select id="new-user-role" name="role">
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button type="submit">Ajouter l'utilisateur</button>
      </form>

      <div id="user-management-message" class="user-management-message" aria-live="polite"></div>
      <table class="user-management-table">
        <thead>
          <tr><th>Utilisateur</th><th>Profil</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  const form = root.querySelector('#add-user-form');
  const message = root.querySelector('#user-management-message');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const username = root.querySelector('#new-user-username').value.trim();
    const password = root.querySelector('#new-user-password').value;
    const role = root.querySelector('#new-user-role').value;
    message.textContent = '';
    onAddUser?.({ username, password, role, setMessage: msg => { message.textContent = msg; } });
  });

  root.querySelectorAll('.delete-user-button').forEach(button => {
    button.addEventListener('click', () => {
      const userId = Number(button.dataset.userId);
      onDeleteUser?.(userId);
    });
  });
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/\'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
