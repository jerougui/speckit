import { describe, expect, it } from 'vitest';
import { renderLoginScreen } from '../../src/ui/login.js';
import { renderUserManagement } from '../../src/ui/user-management.js';

describe('Auth UI', () => {
  it('affiche l écran de connexion et gère la soumission', () => {
    document.body.innerHTML = '<div id="auth-root"></div>';
    const root = document.getElementById('auth-root');
    let submitted = false;

    const view = renderLoginScreen(root, {
      onSubmit: ({ username, password }) => {
        submitted = username === 'admin' && password === 'admin';
      }
    });

    root.querySelector('#login-username').value = 'admin';
    root.querySelector('#login-password').value = 'admin';
    root.querySelector('#login-form').dispatchEvent(new Event('submit', { bubbles: true }));

    expect(submitted).toBe(true);
    expect(view).toHaveProperty('setError');
  });

  it('rend la gestion des utilisateurs avec une liste', () => {
    document.body.innerHTML = '<div id="user-management-root"></div>';
    const root = document.getElementById('user-management-root');

    renderUserManagement(root, {
      users: [
        { id: 1, username: 'admin', role: 'admin' },
        { id: 2, username: 'user1', role: 'user' }
      ],
      onAddUser: () => {},
      onDeleteUser: () => {}
    });

    expect(root.querySelectorAll('.user-management-table tbody tr').length).toBe(2);
    expect(root.querySelector('#new-user-username')).not.toBeNull();
  });
});
