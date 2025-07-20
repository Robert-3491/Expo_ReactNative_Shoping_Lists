import { getDatabase } from "./databaseService";

const db = getDatabase();

interface Settings {
  id: number;
  defaultSectionName: string;
  closeModalOnAdd: number;
  orderByChecked: number;
}

export const initializeSettings = async () => {
  db.execSync(`
    INSERT OR IGNORE INTO settings (id, defaultSectionName, closeModalOnAdd, orderByChecked) 
    VALUES (1, 'Section', 0, 1)
  `);
};

export const getSettings = (): Settings => {
  const settings = db.getFirstSync(
    "SELECT * FROM settings WHERE id = 1"
  ) as Settings;
  return settings;
};

//Getters
export const getDefaultSectionName = (): string => {
  const settings = getSettings();
  return settings.defaultSectionName;
};

export const getCloseModalOnAdd = (): boolean => {
  const settings = getSettings();
  return Boolean(settings.closeModalOnAdd);
};

export const getOrderByChecked = (): boolean => {
  const settings = getSettings();
  return Boolean(settings.orderByChecked);
};

//Setters
export const setDefaultSectionName = (name: string): void => {
  db.execSync(
    `UPDATE settings SET defaultSectionName = '${name}' WHERE id = 1`
  );
};

export const setCloseModalOnAdd = (value: boolean): void => {
  db.execSync(
    `UPDATE settings SET closeModalOnAdd = ${value ? 1 : 0} WHERE id = 1`
  );
};

export const setOrderByChecked = (value: boolean): void => {
  db.execSync(
    `UPDATE settings SET orderByChecked = ${value ? 1 : 0} WHERE id = 1`
  );
};
