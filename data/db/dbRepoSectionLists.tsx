import { SectionList } from "@/data/models/sectionList";
import { getDatabase } from "./databaseService";

const db = getDatabase();

export const addSectionList = async (
  sectionList: SectionList
): Promise<number> => {
  try {
    const result = db.runSync(
      "INSERT INTO sectionlists (mainListId, title, isVisible) VALUES (?, ?, ?)",
      [sectionList.mainListId, sectionList.title, sectionList.isVisible]
    );
    console.log("SectionList added with ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding SectionList:", error);
    throw error;
  }
};

export const getAllSectionLists = async (): Promise<SectionList[]> => {
  try {
    const result = db.getAllSync("SELECT * FROM sectionlists ORDER BY id ASC");
    return result.map((row: any) => {
      const sectionList = new SectionList(
        row.title,
        row.isVisible,
        row.mainListId
      );
      sectionList.id = row.id;
      console.log("SectionList retrieved:", sectionList);
      return sectionList;
    });
  } catch (error) {
    console.error("Error getting SectionLists:", error);
    throw error;
  }
};

export const getSectionListsByMainListId = async (
  mainListId: number
): Promise<SectionList[]> => {
  try {
    const result = db.getAllSync(
      "SELECT * FROM sectionlists WHERE mainListId = ? ORDER BY id ASC",
      [mainListId]
    );
    return result.map((row: any) => {
      const sectionList = new SectionList(
        row.title,
        row.isVisible,
        row.mainListId
      );
      sectionList.id = row.id;
      console.log(
        "SectionList retrieved for mainListId:",
        mainListId,
        sectionList
      );
      return sectionList;
    });
  } catch (error) {
    console.error("Error getting SectionLists by mainListId:", error);
    throw error;
  }
};

export const updateSectionList = async (
  title: string,
  id: number
): Promise<void> => {
  try {
    db.runSync("UPDATE sectionlists SET title = ? WHERE id = ?", [title, id]);
    console.log("SectionList updated:", id);
  } catch (error) {
    console.error("Error updating SectionList:", error);
    throw error;
  }
};

export const deleteSectionList = async (id: number): Promise<void> => {
  try {
    db.runSync("DELETE FROM sectionlists WHERE id = ?", [id]);
    console.log("SectionList deleted from db:", id);
  } catch (error) {
    console.error("Error deleting SectionList:", error);
    throw error;
  }
};

export const getSectionListById = async (id: number): Promise<any | null> => {
  try {
    const result = db.getFirstSync("SELECT * FROM sectionlists WHERE id = ?", [
      id,
    ]);
    return result || null;
  } catch (error) {
    console.error("Error getting SectionList by ID:", error);
    throw error;
  }
};

export const setAllSectionListsInvisible = async (
  mainListId: number
): Promise<void> => {
  try {
    db.runSync("UPDATE sectionlists SET isVisible = 0 WHERE mainListId = ?", [
      mainListId,
    ]);
    console.log(
      "All SectionLists set to invisible for mainListId:",
      mainListId
    );
  } catch (error) {
    console.error("Error setting all section lists invisible:", error);
    throw error;
  }
};

export const setVisibleSectionList = async (id: number): Promise<void> => {
  console.log("Setting visible SectionList:", id);

  try {
    // Get the mainListId for this section list
    const sectionList = await getSectionListById(id);
    if (!sectionList) {
      throw new Error("SectionList not found");
    }

    // Then set the specific one as visible
    db.runSync("UPDATE sectionlists SET isVisible = 1 WHERE id = ?", [id]);
    console.log("SectionList set as visible:", id);
  } catch (error) {
    console.error("Error setting visible SectionList:", error);
    throw error;
  }
};

export const toggleSectionListVisibility = async (
  id: number
): Promise<void> => {
  try {
    const sectionList = await getSectionListById(id);
    if (!sectionList) {
      throw new Error("SectionList not found");
    }

    const newVisibility = !sectionList.isVisible;
    db.runSync("UPDATE sectionlists SET isVisible = ? WHERE id = ?", [
      newVisibility,
      id,
    ]);
    console.log("SectionList visibility toggled:", id, "to", newVisibility);
  } catch (error) {
    console.error("Error toggling SectionList visibility:", error);
    throw error;
  }
};

export const getVisibleSectionList = async (
  mainListId: number
): Promise<SectionList | null> => {
  try {
    const result = db.getFirstSync(
      "SELECT * FROM sectionlists WHERE mainListId = ? AND isVisible = 1",
      [mainListId]
    ) as any;

    if (!result) {
      console.log("No visible SectionList found for mainListId:", mainListId);
      return null;
    }

    const sectionList = new SectionList(
      result.title,
      result.isVisible === 1,
      result.mainListId
    );
    sectionList.id = result.id;
    console.log("Visible SectionList retrieved:", sectionList);
    return sectionList;
  } catch (error) {
    console.error("Error getting visible SectionList:", error);
    throw error;
  }
};

export const toggleSectionVisibilityTrue = async (id: number) => {
  try {
    db.runSync("UPDATE sectionlists SET isVisible = 1 WHERE id = ?", [id]);
    console.log("SectionList set to visible:", id);
  } catch (error) {
    console.error("Error toggling SectionList visibility to true:", error);
    throw error;
  }
};
