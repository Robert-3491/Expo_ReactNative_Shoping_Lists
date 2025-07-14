import { SectionList } from "@/data/models/sectionList";
import * as dbRepoSectionLists from "@/data/db/dbRepoSectionLists";
import * as dbMainList from "@/data/db/dbRepoList";

let sectionLists: SectionList[] = [];
let activeMainListId = 0;

export async function initializeSectionLists() {
  sectionLists = (await dbRepoSectionLists.getAllSectionLists()).map(
    (list) =>
      new SectionList(list.title, list.isVisible, list.mainListId, list.id)
  );
  await dbActiveMainList();
}

const dbActiveMainList = async () => {
  const activeList = await dbMainList.getActiveMainList();
  // eslint-disable-next-line no-unused-expressions
  activeList ? (activeMainListId = activeList.id) : (activeMainListId = 0);
};

export const getSectionLists = (): SectionList[] => {
  return sectionLists.filter((list) => list.mainListId === activeMainListId);
};

// for MainList connection
// Callback system for UI updates
let onRefreshSectionsCallback: (() => void) | null = null;

export const setOnRefreshSectionsCallback = (callback: () => void) => {
  onRefreshSectionsCallback = callback;
};

// Update setActiveMainList to trigger the callback
export const setActiveMainList = (mainListId: number) => {
  activeMainListId = mainListId;

  if (onRefreshSectionsCallback) {
    onRefreshSectionsCallback();
  }
};

export const getActiveMainListId = (): number => {
  return activeMainListId;
};
// end

export const toggleItemVisibility = (itemId: number) => {
  sectionLists = sectionLists.map((item) =>
    item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
  );
  dbRepoSectionLists.toggleSectionListVisibility(itemId);
};

export const deleteList = (id: number) => {
  dbRepoSectionLists.deleteSectionList(id);
  sectionLists = sectionLists.filter((list) => list.id !== id);
};

export const addSection = async (title: string): Promise<SectionList> => {
  let newSection = new SectionList(title, true, activeMainListId);
  const newSectionid = await dbRepoSectionLists.addSectionList(newSection);
  newSection.id = newSectionid;
  sectionLists = [...sectionLists, newSection];

  if (onRefreshSectionsCallback) {
    onRefreshSectionsCallback();
  }
  return newSection;
};
