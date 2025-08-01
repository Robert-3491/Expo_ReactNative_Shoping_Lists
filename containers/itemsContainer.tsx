import { Item } from "@/data/models/item";
import * as dbRepoItem from "@/data/db/dbRepoItem";
import { updateSectionItemCount } from "@/containers/sectionListsContainer";
import { externalRefreshCallbackMainLists } from "@/containers/mainListsContainer";
import {
  updateSectionItemCount,
  updateMainListItemCountTrigger,
} from "@/containers/sectionListsContainer";

let initialized = false;

let itemsList: Item[] = [];

export async function initializeItemLists() {
  if (!initialized) {
    const sectionListIds: number[] = [];
    itemsList = (await dbRepoItem.getAllItems()).map((item) => {
      if (!sectionListIds.includes(item.sectionListId)) {
        sectionListIds.push(item.sectionListId);
      }

      return new Item(
        item.title,
        item.sectionListId,
        item.isChecked,
        item.link,
        item.id
      );
    });

    sectionListIds.forEach((id) => {
      const filteredItemsList = getFilteredList(id);
      const checkedItemsCount = getCheckedItemsCount(filteredItemsList);

      updateSectionItemCount(id, filteredItemsList.length, checkedItemsCount);
      updateMainListItemCountTrigger();
    });

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

const getFilteredList = (sectionId: number): Item[] => {
  return itemsList
    .filter((item) => item.sectionListId === sectionId)
    .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
};

const getCheckedItemsCount = (itemList: Item[]): number => {
  return itemList.filter((item) => item.isChecked).length;
};

export const getItems = (sectionId: number): Item[] => {
  const filteredItemsList = getFilteredList(sectionId);
  const checkedItemsCount = getCheckedItemsCount(filteredItemsList);

  updateSectionItemCount(
    sectionId,
    filteredItemsList.length,
    checkedItemsCount
  );
  return filteredItemsList;
};

export const addItem = async (
  title: string,
  sectionListId: number,
  link: string
) => {
  let newItem = new Item(title.trim(), sectionListId, false, link);
  const newItemId = await dbRepoItem.addItem(newItem);
  newItem.id = newItemId;
  itemsList = [...itemsList, newItem];

  const callback = onRefreshItemsCallbacks.get(sectionListId);
  externalRefreshCallbackMainLists();
  if (callback) {
    callback();
  }
};

export const deleteItem = (id: number, refreshData: () => void) => {
  dbRepoItem.deleteItem(id);
  itemsList = itemsList.filter((item) => item.id !== id);
  externalRefreshCallbackMainLists();
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
