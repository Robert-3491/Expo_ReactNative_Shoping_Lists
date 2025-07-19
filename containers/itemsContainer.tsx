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

let onRefreshItemsCallbacks: Map<number, () => void> = new Map();
export const setOnRefreshItemsCallback = (
  sectionId: number,
  callback: (() => void) | null
) => {
  if (callback) {
    onRefreshItemsCallbacks.set(sectionId, callback);
  } else {
    onRefreshItemsCallbacks.delete(sectionId);
  }
};

export const getItems = (sectionId: number): Item[] => {
  return itemsList
    .filter((item) => item.sectionListId === sectionId)
    .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
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

  const callback = onRefreshItemsCallbacks.get(sectionListId);
  if (callback) {
    callback();
  }
};

export const deleteList = (id: number, refreshData: () => void) => {
  dbRepoItem.deleteItem(id);
  itemsList = itemsList.filter((item) => item.id !== id);
  refreshData();
};

export const toggleIsChecked = (id: number, sectionId: number) => {
  dbRepoItem.toggleItemChecked(id);

  itemsList = itemsList.map((item) =>
    item.id === id ? { ...item, isChecked: !item.isChecked } : item
  );

  const callback = onRefreshItemsCallbacks.get(sectionId);
  if (callback) {
    callback();
  }
};

export const updateItem = async (
  id: number,
  title: string,
  link: string,
  sectionId: number
) => {
  itemsList = itemsList.map((list) =>
    list.id === id ? { ...list, title, link } : list
  );
  await dbRepoItem.updateItem(id, title, link);
  const callback = onRefreshItemsCallbacks.get(sectionId);
  if (callback) {
    callback();
  }
};
