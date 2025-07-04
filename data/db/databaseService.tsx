import * as SQLite from "expo-sqlite";

export const initializeDatabase = async () => {
  const db = SQLite.openDatabaseSync("shopingLists.db");
  //db.execSync("DROP TABLE IF EXISTS mainlists;");
  db.execSync(`
      CREATE TABLE IF NOT EXISTS mainlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        isActive INTEGER DEFAULT 1
      );
    `);
};
