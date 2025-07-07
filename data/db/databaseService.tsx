import * as SQLite from "expo-sqlite";

// Singleton database instance
let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!dbInstance) {
    dbInstance = SQLite.openDatabaseSync("shopingLists.db");
  }
  return dbInstance;
};

export const initializeDatabase = async () => {
  const db = getDatabase();

  // Enable foreign key constraints (required for CASCADE DELETE)
  db.execSync(`PRAGMA foreign_keys = ON;`);

  // Create mainlists table
  db.execSync(`
    CREATE TABLE IF NOT EXISTS mainlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      isActive INTEGER DEFAULT 0
    );
  `);

  // Create sectionlists table
  db.execSync(`
    CREATE TABLE IF NOT EXISTS sectionlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mainListId INTEGER NOT NULL,
      title TEXT NOT NULL,
      isVisible INTEGER,
      FOREIGN KEY (mainListId) REFERENCES mainlists (id) ON DELETE CASCADE
    );
  `);
};
