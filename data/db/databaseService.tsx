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
  db.execSync(`
    CREATE TABLE IF NOT EXISTS mainlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      isActive INTEGER DEFAULT 0
    );
  `);
};
