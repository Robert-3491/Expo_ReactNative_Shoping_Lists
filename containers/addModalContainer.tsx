import * as sectionListsContainer from "@/containers/sectionListsContainer";
import * as itemsContainer from "@/containers/itemsContainer";
import { SectionList } from "@/data/models/sectionList";
//
const isNotWhitespace = (str: string): boolean => {
  return str.trim().length > 0;
};

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const addSection = async (
  addTitle: string,
  setCurrentSectionList: (sectionList: SectionList) => void,
  clearText: () => void
) => {
  if (isNotWhitespace(addTitle)) {
    const newSection = await sectionListsContainer.addSection(
      capitalizeFirst(addTitle.trim())
    );
    setCurrentSectionList(newSection);
    clearText();
  }
};

export const addItem = (
  title: string,
  sectionList: SectionList,
  link: string
) => {
  itemsContainer.addItem(title, sectionList.id, link);
  if (!sectionList.isVisible) {
    sectionListsContainer.toggleItemVisibility(sectionList.id);
  }
};
