import { SectionList } from "@/data/models/sectionList";
import * as dbRepoSectionLists from "@/data/db/dbRepoSectionLists";
import * as dbMainList from "@/data/db/dbRepoList";
import * as textFormating from "../Utilities/textFormating";
import { externalRefreshCallbackMainLists } from "@/containers/mainListsContainer";
import { updateMainListItemCount } from "@/containers/mainListsContainer";

let sectionLists: SectionList[] = [];
let activeMainListId = 0;
const mainListsIds: number[] = [];

export async function initializeSectionLists() {
  sectionLists = (await dbRepoSectionLists.getAllSectionLists()).map((list) => {
    if (!mainListsIds.includes(list.mainListId)) {
      mainListsIds.push(list.mainListId);
    }
    return new SectionList(
      list.title,
      list.isVisible,
      list.mainListId,
      list.id
    );
  });
  await dbActiveMainList();
}

const dbActiveMainList = async () => {
  const activeList = await dbMainList.getActiveMainList();
  // eslint-disable-next-line no-unused-expressions
  activeList ? (activeMainListId = activeList.id) : (activeMainListId = 0);
};

export const getSectionLists = (): SectionList[] => {
  updateMainListItemCountTrigger();
  return sectionLists.filter(
    (section) => section.mainListId === activeMainListId
  );
};

export const getSectionListsByMainListId = (id: number): SectionList[] => {
  return sectionLists.filter((section) => section.mainListId === id);
};

export const updateMainListItemCountTrigger = () => {
  mainListsIds.forEach((mainListId) => {
    const mainListContent = sectionLists.filter(
      (section) => section.mainListId === mainListId
    );

    const sectionCount = mainListContent.length;

    let totalItemsCount = 0;
    const calculateItemCount = mainListContent.forEach((section) => {
      totalItemsCount += section.itemsCount;
    });

    const contentCount: [sectionCount: number, totalItemsCount: number] = [
      sectionCount,
      totalItemsCount,
    ];

    updateMainListItemCount(mainListId, contentCount);
  });
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

export const updateSectionItemCount = (
  id: number,
  itemsCount: number,
  checkedItemsCount: number
) => {
  sectionLists = sectionLists.map((list) =>
    list.id === id ? { ...list, itemsCount, checkedItemsCount } : list
  );
  refreshCallback();
};
