import { Pool } from 'pg';

let dbPool: Pool;
let isDbEnabled = false;

try {
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.trim() !== '') {
    // Attempt to manually parse to handle passwords with special characters like '/' or '?'
    // that typically break standard URL parsers.
    const regex = /^postgres(?:ql)?:\/\/([^:]+):(.+)@([^:/]+)(?::(\d+))?\/(.+)$/;
    const match = dbUrl.match(regex);
    
    if (match) {
      const [_, user, password, host, port, database] = match;
      dbPool = new Pool({
        user,
        password,
        host,
        port: port ? parseInt(port, 10) : 5432,
        database,
        ssl: dbUrl.includes('render.com') || dbUrl.includes('supabase') || dbUrl.includes('elephantsql') || host.includes('itnahdoinu') ? { rejectUnauthorized: false } : undefined
      });
      isDbEnabled = true;
    } else {
      // Fallback for other formats
      dbPool = new Pool({ connectionString: dbUrl });
      isDbEnabled = true;
    }
  } else {
    // Dummy pool that won't actually be used, or connect to localhost natively
    dbPool = new Pool(); 
  }
} catch (error) {
  // Suppression of the full error object to avoid logging the DATABASE_URL which contains the password
  console.warn('PostgreSQL: Failed to initialize database connection. Database features disabled.');
  dbPool = new Pool();
}

// Wrapper to prevent crashing if db isn't validly configured
const queryWrapper = async (text: string, params?: any[]) => {
  if (!isDbEnabled) {
    // If it's a COUNT query, return a mocked count row to avoid undefined access
    if (text.toUpperCase().includes('COUNT(')) {
      return { rows: [{ count: '0' }] };
    }
    // Otherwise return empty array of rows
    return { rows: [] };
  }
  return dbPool.query(text, params);
};

// Inicializace tabulky pro poptávky
async function initDb() {
  if (!isDbEnabled) {
    console.warn('Skipping initDb: No valid DATABASE_URL.');
    return;
  }
  try {
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        source TEXT NOT NULL,
        ip TEXT,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS popup_stats (
        id SERIAL PRIMARY KEY,
        action TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      INSERT INTO settings (key, value) VALUES ('show_preferred_time', 'false') ON CONFLICT (key) DO NOTHING;
      INSERT INTO settings (key, value) VALUES ('show_window_service', 'false') ON CONFLICT (key) DO NOTHING;
      INSERT INTO settings (key, value) VALUES ('test_mode', 'false') ON CONFLICT (key) DO NOTHING;
    `);
    console.log('PostgreSQL db initialized');
  } catch (err) {
    console.error('Db init error: Podařilo se připojit, ale inicializace tabulek selhala. (Chyba byla skryta pro bezpečnost)');
  }
}

// Spuštění při načtení modulu
initDb();

const dbObj = {
  query: queryWrapper,
  connect: async () => {
    if (!isDbEnabled) throw new Error('Database is not configured with a valid DATABASE_URL');
    return dbPool.connect();
  }
};

export default dbObj;
