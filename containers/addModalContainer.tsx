import * as sectionListsContainer from "@/containers/sectionListsContainer";
import * as itemsContainer from "@/containers/itemsContainer";
import { SectionList } from "@/data/models/sectionList";
import * as textFormating from "../Utilities/textFormating";
import { getCloseModalOnAdd } from "@/data/db/dbRepoSettings";

export const addSection = async (
  addTitle: string,
  setCurrentSectionList: (sectionList: SectionList) => void,
  clearText: () => void,
  modalClosingBehaviour: () => void
) => {
  const newSection = await sectionListsContainer.addSection(addTitle);
  if (!newSection) {
    return;
  }
  setCurrentSectionList(newSection);
  clearText();

  if (getCloseModalOnAdd()) {
    modalClosingBehaviour();
  }
};

export const addItem = (
  title: string,
  sectionList: SectionList,
  link: string,
  clearText: () => void,
  modalClosingBehaviour: () => void
) => {
  if (textFormating.isWhitespace(title)) {
    return;
  }

  itemsContainer.addItem(title, sectionList.id, link);
  sectionListsContainer.toggleSectionVisibilityTrue(sectionList.id);
  clearText();

  if (getCloseModalOnAdd()) {
    modalClosingBehaviour();
  }
};

export const ensureHttps = (url: string): string => {
  const trimmedUrl = url.trim();

  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }
  return `https://${trimmedUrl}`;
};
