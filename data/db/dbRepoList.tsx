import { MainList } from "@/data/models/mainList";
import { getDatabase } from "./databaseService";

const db = getDatabase();

export const addMainList = async (mainList: MainList): Promise<number> => {
  try {
    const result = db.runSync(
      "INSERT INTO mainlists (title, isActive) VALUES (?, ?)",
      [mainList.title, mainList.isActive ? 1 : 0]
    );
    console.log("MainList added with ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding MainList:", error);
    throw error;
  }
};

export const getAllMainLists = async (): Promise<MainList[]> => {
  try {
    const result = db.getAllSync("SELECT * FROM mainlists ORDER BY id ASC");
    return result.map((row: any) => {
      const mainList = new MainList(row.title);
      mainList.id = row.id;
      mainList.isActive = row.isActive === 1;
      console.log("MainList retrieved:", mainList);
      return mainList;
    });
  } catch (error) {
    console.error("Error getting MainLists:", error);
    throw error;
  }
};

export const updateMainList = async (
  id: number,
  mainList: MainList
): Promise<void> => {
  try {
    db.runSync("UPDATE mainlists SET title = ?, isActive = ? WHERE id = ?", [
      mainList.title,
      mainList.isActive ? 1 : 0,
      id,
    ]);
    console.log("MainList updated:", id);
  } catch (error) {
    console.error("Error updating MainList:", error);
    throw error;
  }
};

export const deleteMainList = async (id: number): Promise<void> => {
  try {
    db.runSync("DELETE FROM mainlists WHERE id = ?", [id]);
    console.log("MainList deleted from db:", id);
  } catch (error) {
    console.error("Error deleting MainList:", error);
    throw error;
  }
};

export const getMainListById = async (id: number): Promise<any | null> => {
  try {
    const result = db.getFirstSync("SELECT * FROM mainlists WHERE id = ?", [
      id,
    ]);
    return result || null;
  } catch (error) {
    console.error("Error getting MainList by ID:", error);
    throw error;
  }
};

export const setAllInactive = async (): Promise<void> => {
  try {
    db.runSync("UPDATE mainlists SET isActive = 0");
    console.log("All MainLists set to inactive (DB)");
  } catch (error) {
    console.error("Error setting all inactive:", error);
    throw error;
  }
};

export const setActiveMainList = async (id: number): Promise<void> => {
  try {
    // First set all to inactive
    await setAllInactive();

    // Then set the specific one as active
    db.runSync("UPDATE mainlists SET isActive = 1 WHERE id = ?", [id]);
    console.log("MainList set as active: (DB)", id);
  } catch (error) {
    console.error("Error setting active MainList:", error);
    throw error;
  }
};

export const getActiveMainList = async (): Promise<MainList | null> => {
  try {
    const result = db.getFirstSync(
      "SELECT * FROM mainlists WHERE isActive = 1"
    ) as any;

    if (!result) {
      console.log("No active MainList found");
      return null;
    }

    const mainList = new MainList(result.title);
    mainList.id = result.id;
    mainList.isActive = result.isActive === 1;
    console.log("Active MainList retrieved:", mainList);
    return mainList;
  } catch (error) {
    console.error("Error getting active MainList:", error);
    throw error;
  }
};
