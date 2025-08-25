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

export const updateSectionList = async (
  title: string,
  id: number,
  relationId: number
): Promise<void> => {
  try {
    if (relationId === 0) {
      db.runSync("UPDATE sectionlists SET title = ? WHERE id = ?", [title, id]);
    } else {
      db.runSync(
        "UPDATE sectionlists SET title = ?, mainListId = ? WHERE id = ?",
        [title, relationId, id]
      );
    }

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

export const toggleSectionListVisibility = async (
  section: SectionList
): Promise<void> => {
  try {
    db.runSync("UPDATE sectionlists SET isVisible = ? WHERE id = ?", [
      !section.isVisible,
      section.id,
    ]);
    console.log(
      "SectionList visibility toggled:",
      section.id,
      "to",
      !section.isVisible
    );
  } catch (error) {
    console.error("Error toggling SectionList visibility:", error);
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
