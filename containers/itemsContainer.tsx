import { Item } from "@/data/models/item";
import * as dbRepoItem from "@/data/db/dbRepoItem";

let initialized = false;

let itemsList: Item[] = [];

export async function initializeItemLists() {
  if (!initialized) {
    itemsList = (await dbRepoItem.getAllItems()).map(
      (item) =>
        new Item(
          item.title,
          item.sectionListId,
          item.isChecked,
          item.link,
          item.id
        )
    );
    initialized = true;
  }
}

export const getItems = (sectionId: number): Item[] => {
  return itemsList
    .filter((item) => item.sectionListId === sectionId)
    .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
};

let onRefreshItemsCallback: (() => void) | null = null;

export const setOnRefreshItemsCallback = (callback: () => void) => {
  onRefreshItemsCallback = callback;
};

export const addItem = async (
  title: string,
  sectionListId: number,
  link: string
) => {
  let newItem = new Item(title, sectionListId, false, link);
  const newItemId = await dbRepoItem.addItem(newItem);
  newItem.id = newItemId;
  itemsList = [...itemsList, newItem];

  if (onRefreshItemsCallback) {
    onRefreshItemsCallback();
  }
};

export const deleteList = (id: number, refreshData: () => void) => {
  dbRepoItem.deleteItem(id);
  itemsList = itemsList.filter((item) => item.id !== id);
  refreshData();
};

export const toggleIsChecked = (id: number) => {
  dbRepoItem.toggleItemChecked(id);
  itemsList = itemsList.map((item) =>
    item.id === id ? { ...item, isChecked: !item.isChecked } : item
  );

  if (onRefreshItemsCallback) {
    onRefreshItemsCallback();
  }
};
