import { Item } from "@/data/models/item";
import * as dbRepoItem from "@/data/db/dbRepoItem";
import { useState } from "react";

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
  return itemsList.filter((item) => item.sectionListId === sectionId);
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
