import { Item } from "@/data/models/item";
import { MainList } from "@/data/models/mainList";
import { SectionList } from "@/data/models/sectionList";
import * as Clipboard from "expo-clipboard";
import { isWhitespace } from "./textFormating";
import { getItems } from "@/containers/itemsContainer";
import { getSectionListsByMainListId } from "@/containers/sectionListsContainer";
import { showError } from "@/Utilities/messages";

//import {copyToClipboard} from "@/Utilities/clipboardHandler";

interface Params {
  text?: string;
  item?: Item;
  sectionList?: SectionList;
  mainList?: MainList;
}

export const copyToClipboard = async ({
  text,
  item,
  sectionList,
  mainList,
}: Params) => {
  if (text) await Clipboard.setStringAsync(text);

  if (item) await Clipboard.setStringAsync(itemFormating(item));

  if (sectionList) {
    const sectionText = sectionFormating(sectionList);
    if (sectionText) await Clipboard.setStringAsync(sectionText);
    else showError(`${sectionList.title} is empty.`);
  }

  if (mainList) {
    const mainListText = mainListFormating(mainList);
    if (mainListText) await Clipboard.setStringAsync(mainListText);
    else showError(`${mainList.title} is empty.`);
  }
};

const itemFormating = (item: Item): string => {
  if (isWhitespace(item.link)) return `${item.title}`;
  else return `${item.title} \n ${item.link}`;
};

const sectionFormating = (sectionList: SectionList): string | null => {
  const itemsArray = getItems(sectionList.id);
  let sectionText = `${sectionList.title} \n`;

  if (itemsArray.length > 0) {
    itemsArray.forEach((item) => {
      sectionText += `\n ${itemFormating(item)} \n`;
    });
    return sectionText;
  }

  return null;
};

const mainListFormating = (mainList: MainList): string | null => {
  const sectionsArray = getSectionListsByMainListId(mainList.id);
  let mainListText = `${mainList.title} \n`;

  if (sectionsArray.length > 0) {
    sectionsArray.forEach((section) => {
      mainListText += `\n ${sectionFormating(section)} \n`;
    });
    return mainListText;
  }

  return null;
};
