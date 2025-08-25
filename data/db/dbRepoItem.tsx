import { Item } from "@/data/models/item";
import { getDatabase } from "./databaseService";

const db = getDatabase();

export const addItem = async (item: Item): Promise<number> => {
  try {
    const result = db.runSync(
      "INSERT INTO items (sectionListId, title, link, isChecked) VALUES (?, ?, ?, ?)",
      [item.sectionListId, item.title, item.link, item.isChecked]
    );
    console.log("Item added with ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding Item:", error);
    throw error;
  }
};

export const getAllItems = async (): Promise<Item[]> => {
  try {
    const result = db.getAllSync("SELECT * FROM items ORDER BY id ASC");
    return result.map((row: any) => {
      const item = new Item(
        row.title,
        row.sectionListId,
        row.isChecked,
        row.link,
        row.id
      );
      console.log("Item retrieved:", item);
      return item;
    });
  } catch (error) {
    console.error("Error getting Items:", error);
    throw error;
  }
};

export const updateItem = async (
  id: number,
  title: string,
  link: string,
  sectionId?: number
): Promise<void> => {
  try {
    if (sectionId !== undefined) {
      db.runSync(
        "UPDATE items SET title = ?, link = ?, sectionListId = ? WHERE id = ?",
        [title, link, sectionId, id]
      );
    } else {
      db.runSync("UPDATE items SET title = ?, link = ? WHERE id = ?", [
        title,
        link,
        id,
      ]);
    }
    console.log("Item updated:", id);
  } catch (error) {
    console.error("Error updating Item:", error);
    throw error;
  }
};

export const deleteItem = async (id: number): Promise<void> => {
  try {
    db.runSync("DELETE FROM items WHERE id = ?", [id]);
    console.log("Item deleted from db:", id);
  } catch (error) {
    console.error("Error deleting Item:", error);
    throw error;
  }
};

export const toggleItemChecked = async (item: Item): Promise<void> => {
  try {
    console.log(item.isChecked);

    db.runSync("UPDATE items SET isChecked = ? WHERE id = ?", [
      item.isChecked ? 0 : 1,
      item.id,
    ]);
    console.log("Item checked state toggled:", item.id, "to", item.isChecked);
  } catch (error) {
    console.error("Error toggling Item checked state:", error);
    throw error;
  }
};
