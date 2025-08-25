import { updateSection } from "@/containers/sectionListsContainer";
import { updateItem } from "@/containers/itemsContainer";
import * as textFormating from "../Utilities/textFormating";
import { Item } from "@/data/models/item";
import { MainList } from "@/data/models/mainList";
import { saveMainListUpdate } from "@/containers/mainListsContainer";

export const modalUpdateItem = (
  item: Item,
  title: string,
  link: string,
  modalClosingBehaviour: () => void,
  relationId: number
) => {
  if (textFormating.isWhitespace(title)) {
    return;
  }
  updateItem(
    item.id,
    title,
    link,
    relationId === 0 ? item.sectionListId : relationId
  );
  modalClosingBehaviour();
};

export const modalUpdateSection = (
  sectionId: number,
  title: string,
  modalClosingBehaviour: () => void,
  relationId: number
) => {
  if (textFormating.isWhitespace(title)) {
    return;
  }
  title = textFormating.capitalizeFirst(title);
  updateSection(sectionId, title, relationId);
  modalClosingBehaviour();
};

export const modalUpdateList = (
  mainList: MainList,
  updateTitle: string,
  modalClosingBehaviour: () => void,
  setActiveList: (val: MainList) => void
) => {
  if (textFormating.isWhitespace(updateTitle)) {
    return;
  }
  updateTitle = textFormating.capitalizeFirst(updateTitle);

  saveMainListUpdate(mainList, updateTitle, setActiveList);

  modalClosingBehaviour();
};
