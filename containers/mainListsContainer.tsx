import { MainList } from "@/data/models/mainList";
import * as dbRepoList from "@/data/db/dbRepoList";
import * as sectionListsContainer from "@/containers/sectionListsContainer";

//let mainLists: MainList[] = [];

// export async function initializeMainLists() {
//   mainLists = (await dbRepoList.getAllMainLists()).map(
//     (list) => new MainList(list.title, list.isActive, list.id)
//   );
// }

let initialized = false;

let mainLists: MainList[] = [];

export async function initializeMainLists() {
  if (!initialized) {
    mainLists = (await dbRepoList.getAllMainLists()).map(
      (list) => new MainList(list.title, list.isActive, list.id)
    );
    initialized = true;
  }
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

export const setMainListActive = (id: number): void => {
  mainLists = mainLists.map((list) =>
    list.id === id ? { ...list, isActive: true } : list
  );
};

export const handleMainListPress = (
  item: MainList,
  isMainListEditing: boolean,
  setModalVisible: (val: boolean) => void,
  setActiveList: (val: string) => void
) => {
  if (isMainListEditing) {
    return;
  }
  if (item.isActive) {
    setModalVisible(false);
  }
  SetInactiveLists(); // Set all lists to inactive
  dbRepoList.setActiveMainList(item.id); // Update the database to set this list as active
  sectionListsContainer.setActiveMainList(item.id);

  setMainListActive(item.id);
  setActiveList(item.title); // Set the active list title
  setModalVisible(false); // Close the modal after selecting a list
};

export const handleSaveEdit = (
  item: MainList,
  editText: string,
  setIsMainListEditing: (val: boolean) => void,
  setActiveList: (val: string) => void
) => {
  setIsMainListEditing(false); // Exit editing mode for the main list

  const editTextUpped = capitalizeFirst(editText);

  item.isEditing = false;

  if (item.title !== editTextUpped) {
    item.title = editTextUpped; // Update the item's title with the edited text
    dbRepoList.updateMainList(item.id, item); // Update the main list in the database
    updateMainList(item.id, item); // Update the main list in the local state
  }

  if (item.isActive) {
    setActiveList(item.title);
  }
};

export const handleEditPress = (
  item: MainList,
  setIsMainListEditing: (val: boolean) => void
) => {
  setIsMainListEditing(true);

  mainLists = mainLists.map((list) =>
    list.id === item.id ? { ...list, isEditing: true } : list
  );
};

export const mainListsStopEdit = () => {
  mainLists = mainLists.map((list) =>
    list.isEditing === true ? { ...list, isEditing: false } : list
  );
};

export const handleDeleteList = (
  item: MainList,
  setActiveList: (val: string) => void
) => {
  dbRepoList.deleteMainList(item.id); // Remove from database
  deleteMainList(item.id); // Remove from local state

  if (item.isActive) {
    if (mainLists.length > 0) {
      mainLists[0].isActive = true; // Set the first list as active if available
      dbRepoList.setActiveMainList(mainLists[0].id); // Update the database with the new active list
      sectionListsContainer.setActiveMainList(mainLists[0].id);
      setActiveList(mainLists[0].title);
    } else {
      sectionListsContainer.setActiveMainList(0);
      setActiveList("No list created yet");
    } // Clear active list if no lists are left
  }
  return undefined;
};
