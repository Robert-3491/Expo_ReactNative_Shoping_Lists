import { Item } from "@/data/models/item";
import { MainList } from "@/data/models/mainList";
import { SectionList } from "@/data/models/sectionList";
import Clipboard from "@react-native-clipboard/clipboard";
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
  if (text) await Clipboard.setString(text);

  if (item) await Clipboard.setString(itemFormating(item));

  if (sectionList) {
    const sectionText = sectionFormating(sectionList);
    if (sectionText) await Clipboard.setString(sectionText);
    else showError(`${sectionList.title} is empty.`);
  }

  if (mainList) {
    const mainListText = mainListFormating(mainList);
    if (mainListText) await Clipboard.setString(mainListText);
    else showError(`${mainList.title} is empty.`);
  }
};

const itemFormating = (item: Item): string => {
  if (isWhitespace(item.link)) return `<I>${item.title}</I>`;
  else return `<I>${item.title}</I> \n <L>${item.link}</L>`;
};

const sectionFormating = (sectionList: SectionList): string | null => {
  const itemsArray = getItems(sectionList.id);
  let sectionText = `<S>${sectionList.title}</S>\n`;

  if (itemsArray.length > 0) {
    itemsArray.forEach((item) => {
      sectionText += `\n ${itemFormating(item)}\n`;
    });
    return sectionText;
  }

  return null;
};

const mainListFormating = (mainList: MainList): string | null => {
  const sectionsArray = getSectionListsByMainListId(mainList.id);
  let mainListText = "";

  if (sectionsArray.length > 0) {
    sectionsArray.forEach((section) => {
      const sectionText = sectionFormating(section);
      if (sectionText) mainListText += `\n ${sectionText} \n`;
    });

    if (isWhitespace(mainListText)) return null;

    const mainListTitleUpped = mainList.title.toUpperCase();
    const textWithMainList = `<L>${mainListTitleUpped}</L> \n ${mainListText}`;
    return textWithMainList;
  }

  return null;
};
