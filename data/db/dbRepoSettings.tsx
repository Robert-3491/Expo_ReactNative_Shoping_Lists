import { Settings } from "../models/settings";
import { getDatabase } from "./databaseService";

const db = getDatabase();

let settings: Settings;

export const initializeSettings = async () => {
  await db.execAsync(`
    INSERT OR IGNORE INTO settings (id, defaultSectionName, createDefaultSection, closeModalOnAdd, orderByChecked, orderByNew, countIncludesChecked) 
    VALUES (1, 'Section', 1, 0, 1, 1, 1)
  `);
  settings = (await db.getFirstAsync(
    "SELECT * FROM settings WHERE id = 1"
  )) as Settings;
  console.log(settings);
};

export const getSettings = (): Settings => {
  return settings;
};

//Getters
export const getOrderByNew = (): boolean => {
  return Boolean(settings.orderByNew);
};

export const getCreateDefaultSection = (): boolean => {
  return Boolean(settings.createDefaultSection);
};

export const getDefaultSectionName = (): string => {
  return settings.defaultSectionName;
};

export const getCountIncludesChecked = (): boolean => {
  return Boolean(settings.countIncludesChecked);
};

export const getOrderByChecked = (): boolean => {
  return Boolean(settings.orderByChecked);
};

export const getCloseModalOnAdd = (): boolean => {
  return Boolean(settings.closeModalOnAdd);
};

//Setters & Toggles
export const toggleSetOrderByNew = (): void => {
  db.execSync(
    `UPDATE settings SET orderByNew = ${!settings.orderByNew} WHERE id = 1`
  );
  settings.orderByNew = !settings.orderByNew;
};

export const toggleCreateDefaultSection = (): void => {
  db.execSync(
    `UPDATE settings SET createDefaultSection = '${!settings.createDefaultSection}' WHERE id = 1`
  );
  settings.createDefaultSection = !settings.createDefaultSection;
};

export const setDefaultSectionName = (name: string): void => {
  db.execSync(
    `UPDATE settings SET defaultSectionName = '${name}' WHERE id = 1`
  );
  settings.defaultSectionName = name;
};

export const setCountIncludesChecked = (val: boolean): void => {
  db.execSync(`UPDATE settings SET countIncludesChecked = ${val} WHERE id = 1`);
  settings.countIncludesChecked = val;
};

export const toggleSetOrderByChecked = (): void => {
  db.execSync(
    `UPDATE settings SET orderByChecked = ${!settings.orderByChecked} WHERE id = 1`
  );
  settings.orderByChecked = !settings.orderByChecked;
};

export const toggleCloseModalOnAdd = (): void => {
  db.execSync(
    `UPDATE settings SET closeModalOnAdd = ${!settings.closeModalOnAdd} WHERE id = 1`
  );
  settings.closeModalOnAdd = !settings.closeModalOnAdd;
};
