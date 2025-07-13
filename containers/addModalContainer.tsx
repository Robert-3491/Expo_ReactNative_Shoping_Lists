import * as sectionListsContainer from "@/containers/sectionListsContainer";
//
const isNotWhitespace = (str: string): boolean => {
  return str.trim().length > 0;
};

export const addSection = (addTitle: string) => {
  if (isNotWhitespace(addTitle)) {
    sectionListsContainer.addSection(addTitle.trim());
  }
};
