import { MainList } from "@/data/models/mainList";
import * as dbRepoList from "@/data/db/dbRepoList";
import * as sectionListsContainer from "@/containers/sectionListsContainer";
import * as textFormating from "../Utilities/textFormating";
import {
  getCreateDefaultSection,
  getDefaultSectionName,
  getOrderByNew,
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
  const getMainListsFromDb = async () => {
    const dbLists = await dbRepoList.getAllMainLists();
    return dbLists.map((list) => {
      return new MainList(list.title, list.isActive, list.id);
    });
  };
  let basicMainLists;
  if (!initialized) {
    basicMainLists = await getMainListsFromDb();

    if (!basicMainLists.length) {
      await createMainListForEmptyInitialization();
      basicMainLists = await getMainListsFromDb();
    }
    mainLists = await addContentCountsToMainLists(basicMainLists);
    initialized = true;
  }
}

export const getMainLists = async (): Promise<MainList[]> => {
  const sortedMainLists = mainLists.sort((a, b) => {
    if (getOrderByNew()) {
      return a.id - b.id; // ascending order
    } else {
      return b.id - a.id; // descending order
    }
  });

  return await addContentCountsToMainLists(sortedMainLists);
};

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

export const getActiveMainList = async (): Promise<MainList | undefined> => {
  const activeList = mainLists.find((list) => list.isActive);
  if (!activeList) return undefined;

  const [updatedActiveList] = await addContentCountsToMainLists([activeList]);
  return updatedActiveList;
};

export const isMainListEmpty = (): boolean => {
  return mainLists.length === 0;
};

export function SetInactiveLists() {
  mainLists.forEach((list) => {
    list.isActive = false;
  });
}

export const addMainList = async (
  title: string,
  reloadMainList: () => void,
  setActiveList: (val: MainList) => void
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
  setActiveList(newList);
  sectionListsContainer.setActiveMainList(newList.id);

  if (getCreateDefaultSection()) {
    sectionListsContainer.addSection(getDefaultSectionName());
  }
};

export const importMainList = async (title: string): Promise<number> => {
  const titleUpped = textFormating.capitalizeFirst(title.trim());
  const newList = new MainList(titleUpped, false); // Create a new MainList instance
  newList.id = await dbRepoList.addMainList(newList); // Add the new list to the database

  mainLists = [...mainLists, newList];

  if (onRefreshCallback) {
    onRefreshCallback();
  }
  return newList.id;
};

export const createMainListForEmptyInitialization = async () => {
  const newList = new MainList("List", true); // Create a new MainList instance
  newList.id = await dbRepoList.addMainList(newList); // Add the new list to the database

  mainLists = [...mainLists, newList];

  if (onRefreshCallback) {
    onRefreshCallback();
  }
};

export const deleteMainList = (id: number) => {
  mainLists = mainLists.filter((list) => list.id !== id);
};

export const updateMainList = (id: number, updatedList: MainList) => {
  const index = mainLists.findIndex((list) => list.id === id);
  if (index !== -1) {
    mainLists[index] = updatedList;
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
  setActiveList: (val: MainList) => void
) => {
  if (item.isActive) {
    setModalVisible(false);
  }

  SetInactiveLists();
  dbRepoList.setActiveMainList(item.id); // Update the database to set this list as active
  sectionListsContainer.setActiveMainList(item.id);

  setMainListActive(item.id);
  setActiveList(item);
  setModalVisible(false); // Close the modal after selecting a list
};

export const saveMainListUpdate = (
  item: MainList,
  editText: string,
  setActiveList: (val: MainList) => void
) => {
  item.title = editText; // Update the item's title with the edited text
  dbRepoList.updateMainList(item.id, item); // Update the main list in the database
  updateMainList(item.id, item); // Update the main list in the local state

  if (item.isActive) {
    setActiveList(item);
  }

  if (onRefreshCallback) {
    onRefreshCallback();
  }
};

export const handleDeleteList = (
  item: MainList,
  setActiveList: (val: MainList | undefined) => void
) => {
  dbRepoList.deleteMainList(item.id); // Remove from database
  deleteMainList(item.id); // Remove from local state

  if (item.isActive) {
    if (mainLists.length > 0) {
      mainLists[0].isActive = true; // Set the first list as active if available
      dbRepoList.setActiveMainList(mainLists[0].id); // Update the database with the new active list
      sectionListsContainer.setActiveMainList(mainLists[0].id);
      setActiveList(mainLists[0]);
    } else {
      sectionListsContainer.setActiveMainList(0);
      setActiveList(undefined);
    }
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
