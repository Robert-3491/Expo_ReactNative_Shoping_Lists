import { updateSection } from "@/containers/sectionListsContainer";
import { updateItem } from "@/containers/itemsContainer";
import * as textFormating from ".//textFormating";
import { Item } from "@/data/models/item";

export const modalUpdateItem = (
  item: Item,
  title: string,
  link: string,
  modalClosingBehaviour: () => void
) => {
  if (textFormating.isNotWhitespace(title)) {
    updateItem(item.id, title, link, item.sectionListId);
    modalClosingBehaviour();
  }
};

export const modalUpdateSection = (
  sectionId: number,
  title: string,
  modalClosingBehaviour: () => void
) => {
  if (textFormating.isNotWhitespace(title)) {
    updateSection(sectionId, title);
    modalClosingBehaviour();
  }
};
