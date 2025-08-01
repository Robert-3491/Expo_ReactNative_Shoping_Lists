import { MainList } from "@/data/models/mainList";
import * as dbRepoList from "@/data/db/dbRepoList";
import * as sectionListsContainer from "@/containers/sectionListsContainer";
import * as textFormating from "../Utilities/textFormating";
import {
  getCreateDefaultSection,
  getDefaultSectionName,
} from "@/data/db/dbRepoSettings";

let initialized = false;

let mainLists: MainList[] = [];

// Helper function to add content count to MainLists
const addContentCountsToMainLists = async (
  lists: MainList[]
): Promise<MainList[]> => {
  return await Promise.all(
    lists.map(async (list) => {
      const contentCount = await dbRepoList.getMainListContentCount(list.id!);

      return new MainList(list.title, list.isActive, list.id, [
        contentCount.sectionCount,
        contentCount.totalItemCount,
      ]);
    })
  );
};

export async function initializeMainLists() {
  if (!initialized) {
    const basicMainLists = (await dbRepoList.getAllMainLists()).map((list) => {
      return new MainList(list.title, list.isActive, list.id);
    });

    mainLists = await addContentCountsToMainLists(basicMainLists);
    initialized = true;
  }
}


export const getMainLists = async (): Promise<MainList[]> => {
  return await addContentCountsToMainLists(mainLists);
=======
export const updateMainListItemCount = (
  id: number,
  contentCount: [sectionCount: number, totalItemsCount: number]
) => {
  mainLists = mainLists.map((mainList) =>
    mainList.id === id ? { ...mainList, contentCount } : mainList
  );
  if (onRefreshCallback) {
    onRefreshCallback();
  }
};

export const getMainLists = (): MainList[] => {
  return mainLists;
};

export const getActiveMainList = (): MainList | undefined => {
  return mainLists.find((list) => list.isActive);
};

export const isMainListEmpty = (): boolean => {
  return mainLists.length === 0;
};

export function SetInactiveLists() {
  mainLists.forEach((list) => {
    list.isActive = false; // Set all local lists to inactive
  });
}

export const addMainList = async (
  title: string,
  reloadMainList: () => void,
  setActiveList: (val: string) => void
) => {
  if (textFormating.isWhitespace(title)) {
    return;
  }
  const titleUpped = textFormating.capitalizeFirst(title.trim());
  dbRepoList.setAllInactive(); // Set all existing lists to inactive
  const newList = new MainList(titleUpped, true); // Create a new MainList instance
  newList.id = await dbRepoList.addMainList(newList); // Add the new list to the database

  SetInactiveLists();
  mainLists = [...mainLists, newList]; //This will make the update re-render

  reloadMainList();
  setActiveList(titleUpped); // Set the active list Title
  sectionListsContainer.setActiveMainList(newList.id);

  if (getCreateDefaultSection()) {
    sectionListsContainer.addSection(getDefaultSectionName());
  }
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

export const setMainListActive = (id: number): void => {
  mainLists = mainLists.map((list) =>
    list.id === id ? { ...list, isActive: true } : list
  );
};

export const handleMainListPress = (
  item: MainList,
  setModalVisible: (val: boolean) => void,
  setActiveList: (val: string) => void
) => {
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

export const saveMainListUpdate = (
  item: MainList,
  editText: string,
  setActiveList: (val: string) => void
) => {
  item.title = editText; // Update the item's title with the edited text
  dbRepoList.updateMainList(item.id, item); // Update the main list in the database
  updateMainList(item.id, item); // Update the main list in the local state

  if (item.isActive) {
    setActiveList(item.title);
  }

  if (onRefreshCallback) {
    onRefreshCallback();
  }
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

// Callback system for UI updates
let onRefreshCallback: (() => void) | null = null;

export const setOnRefreshCallback = (callback: () => void) => {
  onRefreshCallback = callback;
};

export const externalRefreshCallbackMainLists = () => {
  if (onRefreshCallback) {
    onRefreshCallback();
  }
};
