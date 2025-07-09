import { MainList } from "@/data/models/mainList";
import { useEffect } from "react";
import * as dbRepoList from "@/data/db/dbRepoList";

let mainLists: MainList[] = [];

// useEffect(() => {
//   initializeMainLists();
// }, []);

export async function initializeMainLists() {
  mainLists = (await dbRepoList.getAllMainLists()).map(
    (list) => new MainList(list.title, list.isActive, list.id)
  );
}

export const getMainLists = (): MainList[] => {
  return mainLists;
};

export function SetInactiveLists() {
  mainLists.forEach((list) => {
    list.isActive = false; // Set all existing lists to inactive
  });
}

export const addMainList = (newMainList: MainList) => {
  SetInactiveLists();
  mainLists = [...mainLists, newMainList]; //This will make the update re-render
};

export const deleteMainList = (id: number) => {
  mainLists = mainLists.filter((list) => list.id !== id);
  console.log("MainList deleted:", id);
};

export const updateMainList = (id: number, updatedList: MainList) => {
  const index = mainLists.findIndex((list) => list.id === id);
  if (index !== -1) {
    mainLists[index] = updatedList; // Update the list in the local state
  }
};

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const handleMainListPress = (item: MainList) => {
  SetInactiveLists(); // Set all lists to inactive
  dbRepoList.setAllInactive(); // Ensure the database reflects this change
  dbRepoList.setActiveMainList(item.id); // Update the database to set this list as active
};

export const handleSaveEdit = (item: MainList, editText: string): string => {
  const editTextUpped = capitalizeFirst(editText);

  item.isEditing = false;

  if (item.title !== editTextUpped) {
    item.title = editTextUpped; // Update the item's title with the edited text
    dbRepoList.updateMainList(item.id, item); // Update the main list in the database
    updateMainList(item.id, item); // Update the main list in the local state
  }
  return item.title;
};

export const handleDeleteList = (item: MainList): string | undefined => {
  dbRepoList.deleteMainList(item.id); // Remove from database
  deleteMainList(item.id); // Remove from local state

  if (item.isActive) {
    if (mainLists.length > 0) {
      mainLists[0].isActive = true; // Set the first list as active if available
      dbRepoList.setActiveMainList(mainLists[0].id); // Update the database with the new active list
      return mainLists[0].title;
    } else {
      return "No list created yet";
    } // Clear active list if no lists are left
  }
  return undefined;
};
