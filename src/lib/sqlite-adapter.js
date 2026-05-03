import initSqlJs from 'sql.js/dist/sql-wasm.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

const DB_NAME = 'organisateur-albums-photos-db';
const DB_VERSION = 3;
const SQLITE_STORE = 'sqlite';

let SQL;
let db;

function serializeDatabase(database) {
  const data = database.export();
  return JSON.stringify(Array.from(data));
}

function deserializeDatabase(json) {
  try {
    const array = JSON.parse(json);
    return new Uint8Array(array);
  } catch {
    return null;
  }
}

async function openIndexedDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const idb = event.target.result;
      if (!idb.objectStoreNames.contains(SQLITE_STORE)) {
        idb.createObjectStore(SQLITE_STORE);
      }

      // Supprimer l'ancien store photo-files s'il existe (migration)
      if (idb.objectStoreNames.contains('photo-files')) {
        idb.deleteObjectStore('photo-files');
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function initSqlite() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: () => sqlWasmUrl
    });
  }

  const saved = await loadSavedDatabase();
  if (saved) {
    const data = deserializeDatabase(saved);
    if (data) {
      db = new SQL.Database(data);
    }
  }

  if (!db) {
    db = new SQL.Database();
  }

  initSchema();
  return db;
}

async function loadSavedDatabase() {
  const idb = await openIndexedDb();
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(SQLITE_STORE, 'readonly');
    const store = tx.objectStore(SQLITE_STORE);
    const request = store.get('db');

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveDatabase(content) {
  const idb = await openIndexedDb();
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(SQLITE_STORE, 'readwrite');
    const store = tx.objectStore(SQLITE_STORE);
    const request = store.put(content, 'db');

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function initSchema() {
  execute(`CREATE TABLE IF NOT EXISTS albums (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`);

  execute(`CREATE TABLE IF NOT EXISTS photos (
    id TEXT PRIMARY KEY,
    album_id TEXT NOT NULL,
    file_name TEXT NOT NULL,
    data_url TEXT,
    date_taken TEXT NOT NULL,
    metadata TEXT,
    added_at TEXT NOT NULL,
    FOREIGN KEY(album_id) REFERENCES albums(id)
  )`);
}

export function execute(sql, params = []) {
  const statement = db.prepare(sql);
  try {
    statement.bind(params);
    statement.step();
  } finally {
    statement.free();
  }

  persistDatabase().catch(error => {
    console.error('Erreur de persistence de la base SQLite', error);
  });
}

export function all(sql, params = []) {
  const statement = db.prepare(sql);
  const rows = [];
  try {
    statement.bind(params);
    while (statement.step()) {
      rows.push(statement.getAsObject());
    }
  } finally {
    statement.free();
  }
  return rows;
}

export async function persistDatabase() {
  const content = serializeDatabase(db);
  await saveDatabase(content);
}
