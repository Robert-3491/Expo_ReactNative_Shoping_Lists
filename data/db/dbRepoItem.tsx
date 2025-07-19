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

export const getItemsBySectionListId = async (
  sectionListId: number
): Promise<Item[]> => {
  try {
    const result = db.getAllSync(
      "SELECT * FROM items WHERE sectionListId = ? ORDER BY id ASC",
      [sectionListId]
    );
    return result.map((row: any) => {
      const item = new Item(
        row.title,
        row.sectionListId,
        row.isChecked,
        row.link,
        row.id
      );
      console.log("Item retrieved for sectionListId:", sectionListId, item);
      return item;
    });
  } catch (error) {
    console.error("Error getting Items by sectionListId:", error);
    throw error;
  }
};

export const updateItem = async (
  id: number,
  title: string,
  link: string
): Promise<void> => {
  try {
    db.runSync("UPDATE items SET title = ?, link = ? WHERE id = ?", [
      title,
      link,
      id,
    ]);
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

export const getItemById = async (id: number): Promise<any | null> => {
  try {
    const result = db.getFirstSync("SELECT * FROM items WHERE id = ?", [id]);
    return result || null;
  } catch (error) {
    console.error("Error getting Item by ID:", error);
    throw error;
  }
};

export const toggleItemChecked = async (id: number): Promise<void> => {
  try {
    const item = await getItemById(id);
    if (!item) {
      throw new Error("Item not found");
    }

    const newCheckedState = !item.isChecked;
    db.runSync("UPDATE items SET isChecked = ? WHERE id = ?", [
      newCheckedState ? 1 : 0,
      id,
    ]);
    console.log("Item checked state toggled:", id, "to", newCheckedState);
  } catch (error) {
    console.error("Error toggling Item checked state:", error);
    throw error;
  }
};

export const setAllItemsUnchecked = async (
  sectionListId: number
): Promise<void> => {
  try {
    db.runSync("UPDATE items SET isChecked = 0 WHERE sectionListId = ?", [
      sectionListId,
    ]);
    console.log("All Items set to unchecked for sectionListId:", sectionListId);
  } catch (error) {
    console.error("Error setting all items unchecked:", error);
    throw error;
  }
};

export const getCheckedItems = async (
  sectionListId: number
): Promise<Item[]> => {
  try {
    const result = db.getAllSync(
      "SELECT * FROM items WHERE sectionListId = ? AND isChecked = 1 ORDER BY id ASC",
      [sectionListId]
    );
    return result.map((row: any) => {
      const item = new Item(
        row.title,
        row.sectionListId,
        row.isChecked,
        row.link,
        row.id
      );
      return item;
    });
  } catch (error) {
    console.error("Error getting checked Items:", error);
    throw error;
  }
};
