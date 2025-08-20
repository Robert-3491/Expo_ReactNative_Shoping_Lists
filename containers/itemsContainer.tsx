import { Item } from "@/data/models/item";
import * as dbRepoItem from "@/data/db/dbRepoItem";
import { updateSectionItemCount } from "@/containers/sectionListsContainer";
import { externalRefreshCallbackMainLists } from "@/containers/mainListsContainer";
import { getOrderByChecked, getOrderByNew } from "@/data/db/dbRepoSettings";

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
  let filteredList = itemsList.filter(
    (item) => item.sectionListId === sectionId
  );

  const checkedItemsCount = filteredList.filter(
    (item) => item.isChecked
  ).length;

  updateSectionItemCount(sectionId, filteredList.length, checkedItemsCount);

  filteredList = filteredList.sort((a, b) => {
    if (getOrderByNew()) {
      return a.id - b.id; // ascending order
    } else {
      return b.id - a.id; // descending order
    }
  });

  if (getOrderByChecked()) {
    filteredList = filteredList.sort(
      (a, b) => Number(a.isChecked) - Number(b.isChecked)
    );
  }

  return filteredList;
};

export const addItem = async (
  title: string,
  sectionListId: number,
  link: string
): Promise<number> => {
  let newItem = new Item(title.trim(), sectionListId, false, link);
  const newItemId = await dbRepoItem.addItem(newItem);
  newItem.id = newItemId;
  itemsList = [...itemsList, newItem];

  const callback = onRefreshItemsCallbacks.get(sectionListId);
  externalRefreshCallbackMainLists();
  if (callback) {
    callback();
  }
  return newItem.id;
};

export const deleteItem = (id: number, refreshData: () => void) => {
  dbRepoItem.deleteItem(id);
  itemsList = itemsList.filter((item) => item.id !== id);
  externalRefreshCallbackMainLists();
  refreshData();
};

export const toggleIsChecked = (item: Item) => {
  dbRepoItem.toggleItemChecked(item);

  itemsList = itemsList.map((element) =>
    element.id === item.id
      ? { ...element, isChecked: !element.isChecked }
      : element
  );

  const callback = onRefreshItemsCallbacks.get(item.sectionListId);
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
  const updateTitle = title.trim();
  itemsList = itemsList.map((list) =>
    list.id === id ? { ...list, title: updateTitle, link } : list
  );
  await dbRepoItem.updateItem(id, updateTitle, link);
  const callback = onRefreshItemsCallbacks.get(sectionId);
  if (callback) {
    callback();
  }
};

export const updateItemLink = async (
  id: number,
  link: string,
  sectionId?: number
) => {
  let title = "";
  itemsList = itemsList.map((list) => {
    if (list.id === id) {
      title = list.title;
      return { ...list, link, title: list.title };
    }
    return list;
  });

  await dbRepoItem.updateItem(id, title, link);
};

export const refreshItemsForSection = (sectionId: number) => {
  const callback = onRefreshItemsCallbacks.get(sectionId);
  if (callback) {
    callback();
  }
};
