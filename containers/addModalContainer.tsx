import * as sectionListsContainer from "@/containers/sectionListsContainer";
import { SectionList } from "@/data/models/sectionList";
//
const isNotWhitespace = (str: string): boolean => {
  return str.trim().length > 0;
};

export const addSection = async (
  addTitle: string,
  setCurrentSectionList: (sectionList: SectionList) => void
) => {
  if (isNotWhitespace(addTitle)) {
    const newSection = await sectionListsContainer.addSection(addTitle.trim());
    setCurrentSectionList(newSection);
  }
};
