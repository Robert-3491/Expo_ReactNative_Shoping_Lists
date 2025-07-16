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

export const refreshCallback = () => {
  if (onRefreshSectionsCallback) {
    onRefreshSectionsCallback();
  }
};
// end

export const toggleItemVisibility = (itemId: number) => {
  sectionLists = sectionLists.map((item) =>
    item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
  );
  dbRepoSectionLists.toggleSectionListVisibility(itemId);
  refreshCallback();
};

export const deleteList = (id: number) => {
  dbRepoSectionLists.deleteSectionList(id);
  sectionLists = sectionLists.filter((list) => list.id !== id);
};

export const addSection = async (title: string): Promise<SectionList> => {
  let newSection = new SectionList(title, false, activeMainListId);
  const newSectionid = await dbRepoSectionLists.addSectionList(newSection);
  newSection.id = newSectionid;
  sectionLists = [...sectionLists, newSection];

  refreshCallback();
  return newSection;
};

export const toggleSectionVisibilityTrue = async (itemId: number) => {
  const currentItem = sectionLists.find((item) => item.id === itemId);

  if (!currentItem?.isVisible) {
    sectionLists = sectionLists.map((item) =>
      item.id === itemId ? { ...item, isVisible: true } : item
    );
    await dbRepoSectionLists.toggleSectionVisibilityTrue(itemId);
    refreshCallback();
  }
};
