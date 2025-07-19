import * as sectionListsContainer from "@/containers/sectionListsContainer";
import * as itemsContainer from "@/containers/itemsContainer";
import { SectionList } from "@/data/models/sectionList";
import * as textFormating from "./textFormating";
//

export const addSection = async (
  addTitle: string,
  setCurrentSectionList: (sectionList: SectionList) => void,
  clearText: () => void
) => {
  if (textFormating.isNotWhitespace(addTitle)) {
    const newSection = await sectionListsContainer.addSection(
      textFormating.capitalizeFirst(addTitle.trim())
    );
    setCurrentSectionList(newSection);
    clearText();
  }
};

export const addItem = (
  title: string,
  sectionList: SectionList,
  link: string,
  clearText: () => void
) => {
  if (!textFormating.isNotWhitespace(title)) {
    return;
  }
  itemsContainer.addItem(title, sectionList.id, link);
  sectionListsContainer.toggleSectionVisibilityTrue(sectionList.id);
  clearText();
};

export const ensureHttps = (url: string): string => {
  const trimmedUrl = url.trim();

  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }
  return `https://${trimmedUrl}`;
};
