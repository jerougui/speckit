import { beforeEach, describe, expect, it } from 'vitest';
import { initSqlite, execute, all } from '../src/lib/sqlite-adapter.js';
import { createAuthService } from '../src/lib/auth.js';

const AUTH_DB_NAME = 'organisateur-albums-photos-db';

async function resetDatabase() {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(AUTH_DB_NAME);
    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = () => reject(deleteRequest.error);
    deleteRequest.onblocked = () => reject(new Error('Suppression de la base bloquée'));
  });
}

beforeEach(async () => {
  localStorage.clear();
  await resetDatabase();
});

describe('Auth Service', () => {
  it('crée un compte admin initial et permet la connexion', async () => {
    await initSqlite();
    const auth = createAuthService({ all, execute });
    await auth.init();

    const result = await auth.login('admin', 'admin');
    expect(result.success).toBe(true);
    expect(result.user).toEqual({ id: result.user.id, username: 'admin', role: 'admin' });
  });

  it('ajoute, liste et supprime un utilisateur', async () => {
    await initSqlite();
    const auth = createAuthService({ all, execute });
    await auth.init();

    await auth.login('admin', 'admin');
    const addResult = await auth.addUser('bob', 'secret123', 'user');
    expect(addResult.success).toBe(true);

    const listResult = await auth.listUsers();
    expect(listResult.success).toBe(true);
    expect(listResult.users.some(user => user.username === 'bob')).toBe(true);

    const bob = listResult.users.find(user => user.username === 'bob');
    const deleteResult = await auth.deleteUser(bob.id);
    expect(deleteResult.success).toBe(true);

    const afterDelete = await auth.listUsers();
    expect(afterDelete.users.some(user => user.username === 'bob')).toBe(false);
  });

  it('permet à l admin de changer son mot de passe', async () => {
    await initSqlite();
    const auth = createAuthService({ all, execute });
    await auth.init();

    await auth.login('admin', 'admin');
    const changeResult = await auth.changePassword('newadmin123');
    expect(changeResult.success).toBe(true);

    auth.logout();
    const secondLogin = await auth.login('admin', 'newadmin123');
    expect(secondLogin.success).toBe(true);
  });
});
