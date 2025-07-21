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
  if (textFormating.isWhitespace(title)) {
    return;
  }
  updateItem(item.id, title, link, item.sectionListId);
  modalClosingBehaviour();
};

export const modalUpdateSection = (
  sectionId: number,
  title: string,
  modalClosingBehaviour: () => void
) => {
  if (textFormating.isWhitespace(title)) {
    return;
  }
  updateSection(sectionId, title);
  modalClosingBehaviour();
};
