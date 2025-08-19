//import * as Clipboard from "expo-clipboard";
import { showError } from "@/Utilities/messages";
import { isWhitespace } from "@/Utilities/textFormating";
import Clipboard from "@react-native-clipboard/clipboard";
import { importMainList } from "./mainListsContainer";
import { importSection } from "./sectionListsContainer";
import { getLastInsertMainListId } from "@/data/db/dbRepoList";

export const getClipboardText = async () => {
  return await Clipboard.getString();
};

export const importContentController = (content: string) => {
  if (isWhitespace(content)) {
    showError("Empty import field");
    return;
  }

  const contentArray: string[] = content.match(/<[MSIL]>.*?<\/[MSIL]>/g) || [];

  if (!arrayHasItemTag(contentArray)) {
    showError("At least one item required");
    return;
  }

  sectionOrItemContentStart(contentArray);

  contentArray.forEach((element) => {
    if (hasMainListTag(element)) {
      executeImportMainList(element);
    }
    if (hasSectionTag(element)) {
      executeImportSection(element);
    }
    if (hasItemTag(element)) {
      executeImportItem(element);
    }
    if (hasLinkTag(element)) {
      updateLastItem(element);
    }
  });
};

const executeImportMainList = (element: string) => {
  const title = extractTagContent(element);
  importMainList(title);
};
const executeImportSection = async (element: string) => {
  const title = extractTagContent(element);
  importSection(extractTagContent(title), await getLastInsertMainListId());
};

const executeImportItem = (element: string) => {
  const title = extractTagContent(element);
};
const updateLastItem = (element: string) => {
  const link = extractTagContent(element);
};

const sectionOrItemContentStart = async (contentArray: string[]) => {
  // in case it starts with a section, create a List
  if (!hasMainListTag(contentArray[0])) {
    importMainList("Import");
  }
  // in case it starts with an item, create a Section
  if (hasItemTag(contentArray[0])) {
    importSection(extractTagContent("Import"), await getLastInsertMainListId());
  }
};

const hasMainListTag = (content: string) => {
  return content.startsWith("<M>");
};

const hasSectionTag = (content: string) => {
  return content.startsWith("<S>");
};

const hasItemTag = (content: string) => {
  return content.startsWith("<I>");
};

const arrayHasItemTag = (contentArray: string[]) => {
  return contentArray.some((item) => item.startsWith("<I>"));
};

const hasLinkTag = (content: string) => {
  return content.startsWith("<L>");
};

export const extractTagContent = (element: string): string => {
  const content = element.match(/<[^>]+>(.*?)<\/[^>]+>/);
  return content ? content[1] : element;
};
