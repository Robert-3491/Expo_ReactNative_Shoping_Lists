import { Settings } from "../models/settings";
import { getDatabase } from "./databaseService";

const db = getDatabase();

let settings: Settings;

export const initializeSettings = async () => {
  db.execSync(`
    INSERT OR IGNORE INTO settings (id, defaultSectionName, createDefaultSection, closeModalOnAdd, orderByChecked) 
    VALUES (1, 'Section', 1, 0, 1)
  `);
  settings = db.getFirstSync("SELECT * FROM settings WHERE id = 1") as Settings;
  console.log(settings);
};

export const getSettings = (): Settings => {
  return settings;
};

//Getters
export const getDefaultSectionName = (): string => {
  return settings.defaultSectionName;
};

export const getCreateDefaultSection = (): boolean => {
  return Boolean(settings.createDefaultSection);
};

export const getCloseModalOnAdd = (): boolean => {
  return Boolean(settings.closeModalOnAdd);
};

export const getOrderByChecked = (): boolean => {
  return Boolean(settings.orderByChecked);
};

//Setters
export const setDefaultSectionName = (name: string): void => {
  db.execSync(
    `UPDATE settings SET defaultSectionName = '${name}' WHERE id = 1`
  );
  settings.defaultSectionName = name;
};

export const toggleCreateDefaultSection = (val: boolean): void => {
  db.execSync(
    `UPDATE settings SET createDefaultSection = '${!val}' WHERE id = 1`
  );
  settings.createDefaultSection = !val;
};

export const toggleCloseModalOnAdd = (val: boolean): void => {
  db.execSync(`UPDATE settings SET closeModalOnAdd = ${!val} WHERE id = 1`);
  settings.closeModalOnAdd = !val;
};

export const toggleSetOrderByChecked = (val: boolean): void => {
  db.execSync(`UPDATE settings SET orderByChecked = ${!val} WHERE id = 1`);
  settings.orderByChecked = !val;
};
