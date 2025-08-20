import { SectionList } from "@/data/models/sectionList";
import * as dbRepoSectionLists from "@/data/db/dbRepoSectionLists";
import * as dbMainList from "@/data/db/dbRepoList";
import * as textFormating from "../Utilities/textFormating";
import { externalRefreshCallbackMainLists } from "@/containers/mainListsContainer";
import { getOrderByNew } from "@/data/db/dbRepoSettings";

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
  const filteredByActiveMainList = sectionLists.filter(
    (section) => section.mainListId === activeMainListId
  );

  const sortedSections = filteredByActiveMainList.sort((a, b) => {
    if (getOrderByNew()) {
      return a.id - b.id; // ascending order
    } else {
      return b.id - a.id; // descending order
    }
  });
  return sortedSections;
};

export const getSectionListsByMainListId = (id: number): SectionList[] => {
  return sectionLists.filter((section) => section.mainListId === id);
};

// for MainList connection
// Callback system for UI updates
let onRefreshSectionsCallback: (() => void) | null = null;

export const setOnRefreshSectionsCallback = (callback: () => void) => {
  onRefreshSectionsCallback = callback;
};

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
  externalRefreshCallbackMainLists();
};

export const addSection = async (
  title: string
): Promise<SectionList | null> => {
  if (textFormating.isWhitespace(title)) {
    return null;
  }
  title = textFormating.capitalizeFirst(title.trim());

  let newSection = new SectionList(title, false, activeMainListId);
  const newSectionid = await dbRepoSectionLists.addSectionList(newSection);
  newSection.id = newSectionid;
  sectionLists = [...sectionLists, newSection];

  externalRefreshCallbackMainLists();
  refreshCallback();
  return newSection;
};

export const importSection = async (
  title: string,
  mainListId: number
): Promise<number> => {
  let newSection = new SectionList(title, true, mainListId);
  newSection.id = await dbRepoSectionLists.addSectionList(newSection);
  sectionLists = [...sectionLists, newSection];
  externalRefreshCallbackMainLists();
  refreshCallback();

  return newSection.id;
};

//For after adding a new item
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

export const updateSection = async (id: number, title: string) => {
  sectionLists = sectionLists.map((list) =>
    list.id === id ? { ...list, title } : list
  );
  await dbRepoSectionLists.updateSectionList(title, id);
  refreshCallback();
};

export const updateSectionItemCount = async (
  id: number,
  itemsCount: number,
  checkedItemsCount: number
) => {
  sectionLists = sectionLists.map((list) =>
    list.id === id ? { ...list, itemsCount, checkedItemsCount } : list
  );
  refreshCallback();
};
