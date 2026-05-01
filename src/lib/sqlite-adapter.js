import initSqlJs from 'sql.js';

const STORAGE_KEY = 'organisateur-albums-photos-db';
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

export async function initSqlite() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
  }

  const saved = localStorage.getItem(STORAGE_KEY);
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
    data_url TEXT NOT NULL,
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
  persistDatabase();
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

export function persistDatabase() {
  const content = serializeDatabase(db);
  localStorage.setItem(STORAGE_KEY, content);
}
