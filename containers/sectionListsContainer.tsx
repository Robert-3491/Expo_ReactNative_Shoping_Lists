import { SectionList } from "@/data/models/sectionList";
import * as dbRepoSectionLists from "@/data/db/dbRepoSectionLists";
import * as dbMainList from "@/data/db/dbRepoList";

let allSectionLists: SectionList[] = [];
let activeSectionLists: SectionList[] = [];
let activeMainListId = 0;

export async function initializeSectionLists() {
  allSectionLists = (await dbRepoSectionLists.getAllSectionLists()).map(
    (list) =>
      new SectionList(list.title, list.isVisible, list.mainListId, list.id)
  );
  await dbActiveMainList();
  setActiveSectionLists();
}

const dbActiveMainList = async () => {
  const activeList = await dbMainList.getActiveMainList();
  // eslint-disable-next-line no-unused-expressions
  activeList ? (activeMainListId = activeList.id) : (activeMainListId = 0);
};

const setActiveSectionLists = () => {
  activeSectionLists = allSectionLists.filter(
    (list) => list.mainListId === activeMainListId
  );
};

export const getSectionLists = (): SectionList[] => {
  return activeSectionLists;
};

export const toggleItemVisibility = (itemId: number) => {
  activeSectionLists = activeSectionLists.map((item) =>
    item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
  );
  dbRepoSectionLists.toggleSectionListVisibility(itemId);
};

export const deleteList = (id: number) => {
  dbRepoSectionLists.deleteSectionList(id);
  activeSectionLists = activeSectionLists.filter((list) => list.id !== id);
};

export const addDummySections = async () => {
  let newSection = new SectionList("New Section", true, activeMainListId);
  const newSectionid = await dbRepoSectionLists.addSectionList(newSection);
  newSection.id = newSectionid;
  activeSectionLists = [...activeSectionLists, newSection];
};
