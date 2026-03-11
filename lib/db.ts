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
  )
`);

export default db;
