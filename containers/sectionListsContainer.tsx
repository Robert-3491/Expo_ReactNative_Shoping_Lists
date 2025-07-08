import { SectionList } from "@/data/models/sectionList";
import * as dbRepoSectionLists from "@/data/db/dbRepoSectionLists";
import { useEffect } from "react";

let sectionLists: SectionList[] = [];

useEffect(() => {
  initializeMainLists();
}, []);

export async function initializeMainLists() {
  sectionLists = (await dbRepoSectionLists.getAllSectionLists()).map(
    (list) =>
      new SectionList(list.title, list.isVisible, list.mainListId, list.id)
  );
}

export const getMainLists = (): SectionList[] => {
  return sectionLists;
};

export const toggleItemVisibility = (itemId: number) => {
  sectionLists = sectionLists.map((item) =>
    item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
  );
  dbRepoSectionLists.toggleSectionListVisibility(itemId);
};

export const addDummySections = () => {
  let newSection = new SectionList("Title", true, 114);
  dbRepoSectionLists.addSectionList(newSection);
};
