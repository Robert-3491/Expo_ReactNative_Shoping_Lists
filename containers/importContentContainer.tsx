import { showError } from "@/Utilities/messages";
import { isWhitespace } from "@/Utilities/textFormating";
import Clipboard from "@react-native-clipboard/clipboard";
import { importMainList } from "./mainListsContainer";
import { importSection } from "./sectionListsContainer";
import { addItem, updateItemLink } from "./itemsContainer";
import {
  arrayHasItemTag,
  hasMainListTag,
  hasSectionTag,
  hasItemTag,
  hasLinkTag,
  extractTagContent,
} from "@/Utilities/importPageFormating";
import { getDefaultSectionName } from "@/data/db/dbRepoSettings";

export const getClipboardText = async () => {
  return await Clipboard.getString();
};

let currentMainListId: number;
let currentSectionId: number;
let currentItemId: number;

export const importContentController = async (content: string) => {
  if (isWhitespace(content)) {
    showError("Empty import field");
    return;
  }
  const contentArray: string[] = content.match(/<[MSIL]>.*?<\/[MSIL]>/g) || [];
  if (!arrayHasItemTag(contentArray)) {
    showError("At least one item required");
    return;
  }

  await sectionOrItemImportStart(contentArray);

  for (const element of contentArray) {
    if (hasMainListTag(element)) {
      await executeImportMainList(element);
    }

    if (hasSectionTag(element)) {
      await executeImportSection(element);
    }

    if (hasItemTag(element)) {
      await executeImportItem(element);
    }

    if (hasLinkTag(element)) {
      await updateLastItem(element);
    }
  }
};

//Import functions
const executeImportMainList = async (element: string) => {
  const title = extractTagContent(element);
  currentMainListId = await importMainList(title);
};

const executeImportSection = async (element: string) => {
  const title = extractTagContent(element);
  currentSectionId = await importSection(title, currentMainListId);
};

const executeImportItem = async (element: string) => {
  const title = extractTagContent(element);
  currentItemId = await addItem(title, currentSectionId, "");
};

const updateLastItem = async (element: string) => {
  const link = extractTagContent(element);
  await updateItemLink(currentItemId, link);
};

//Special Import start
const sectionOrItemImportStart = async (contentArray: string[]) => {
  // in case the import starts without a Main List
  if (!hasMainListTag(contentArray[0])) {
    currentMainListId = await importMainList("Import");
  }
  // in case the import starts with an item, create a section
  if (hasItemTag(contentArray[0])) {
    currentSectionId = await importSection(
      getDefaultSectionName(),
      currentMainListId
    );
  }
};
