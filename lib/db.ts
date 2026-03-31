import Database from 'better-sqlite3';
import path from 'path';

// Zajišťuje, že databáze bude uložena v kořenovém adresáři projektu
const dbPath = path.resolve(process.cwd(), 'qapi.db');
const db = new Database(dbPath, { verbose: console.log });

// Inicializace tabulky pro poptávky
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT NOT NULL,
    type TEXT NOT NULL,
    color TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    ip TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS popup_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  INSERT OR IGNORE INTO settings (key, value) VALUES ('show_preferred_time', 'false');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('show_window_service', 'true');
`);

export default db;
