import bcrypt from 'bcryptjs';

const AUTH_STORAGE_KEY = 'auth_user';
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin',
  role: 'admin'
};

function getStoredAuthUser() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && parsed.id && parsed.username && parsed.role ? parsed : null;
  } catch {
    return null;
  }
}

function setStoredAuthUser(user) {
  if (!user) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function clearStoredAuthUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function sanitizeUser(row) {
  if (!row) {
    return null;
  }
  return {
    id: row.id,
    username: row.username,
    role: row.role
  };
}

function validateUsername(username) {
  return typeof username === 'string' && /^[A-Za-z0-9_-]{3,50}$/.test(username.trim());
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function getRawUser(all, username) {
  const rows = all(`SELECT * FROM users WHERE username = ? LIMIT 1`, [username]);
  return rows.length ? rows[0] : null;
}

function getUserById(all, userId) {
  const rows = all(`SELECT * FROM users WHERE id = ? LIMIT 1`, [userId]);
  return rows.length ? rows[0] : null;
}

export function createAuthService({ all, execute }) {
  async function ensureUsersTable() {
    execute(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'admin'))
    )`);
  }

  async function init() {
    await ensureUsersTable();
    const rows = all(`SELECT COUNT(*) as count FROM users`);
    const count = rows.length ? rows[0].count : 0;
    if (!count) {
      const passwordHash = hashPassword(DEFAULT_ADMIN.password);
      execute(
        `INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)`,
        [DEFAULT_ADMIN.username, passwordHash, DEFAULT_ADMIN.role]
      );
    }
    return true;
  }

  async function login(username, password) {
    const trimmedUsername = String(username || '').trim();
    if (!trimmedUsername || !validatePassword(password)) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    const rawUser = getRawUser(all, trimmedUsername);
    if (!rawUser || !verifyPassword(password, rawUser.password_hash)) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    const user = sanitizeUser(rawUser);
    setStoredAuthUser(user);
    return { success: true, user };
  }

  function logout() {
    clearStoredAuthUser();
  }

  function getCurrentUser() {
    return getStoredAuthUser();
  }

  async function addUser(username, password, role) {
    const currentUser = getStoredAuthUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return { success: false, error: 'PERMISSION_DENIED' };
    }

    const trimmedUsername = String(username || '').trim();
    if (!validateUsername(trimmedUsername)) {
      return { success: false, error: 'INVALID_USERNAME' };
    }
    if (!validatePassword(password)) {
      return { success: false, error: 'INVALID_PASSWORD' };
    }
    if (role !== 'user' && role !== 'admin') {
      return { success: false, error: 'INVALID_ROLE' };
    }
    if (getRawUser(all, trimmedUsername)) {
      return { success: false, error: 'USERNAME_EXISTS' };
    }

    const passwordHash = hashPassword(password);
    execute(
      `INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)`,
      [trimmedUsername, passwordHash, role]
    );
    return { success: true };
  }

  async function deleteUser(userId) {
    const currentUser = getStoredAuthUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return { success: false, error: 'PERMISSION_DENIED' };
    }
    if (currentUser.id === userId) {
      return { success: false, error: 'CANNOT_DELETE_SELF' };
    }

    const targetUser = getUserById(all, userId);
    if (!targetUser) {
      return { success: false, error: 'USER_NOT_FOUND' };
    }

    execute(`DELETE FROM users WHERE id = ?`, [userId]);
    return { success: true };
  }

  async function listUsers() {
    const currentUser = getStoredAuthUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return { success: false, error: 'PERMISSION_DENIED' };
    }

    const users = all(`SELECT id, username, role FROM users ORDER BY username ASC`);
    return { success: true, users };
  }

  async function changePassword(newPassword) {
    const currentUser = getStoredAuthUser();
    if (!currentUser) {
      return { success: false, error: 'PERMISSION_DENIED' };
    }
    if (!validatePassword(newPassword)) {
      return { success: false, error: 'INVALID_PASSWORD' };
    }

    const passwordHash = hashPassword(newPassword);
    execute(`UPDATE users SET password_hash = ? WHERE id = ?`, [passwordHash, currentUser.id]);
    const updated = sanitizeUser(getUserById(all, currentUser.id));
    setStoredAuthUser(updated);
    return { success: true };
  }

  return {
    init,
    login,
    logout,
    getCurrentUser,
    addUser,
    deleteUser,
    listUsers,
    changePassword
  };
}
