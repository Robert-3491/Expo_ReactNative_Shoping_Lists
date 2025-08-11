import * as dbRepoSettings from "@/data/db/dbRepoSettings";
import { isNotWhitespace, capitalizeFirst } from "@/Utilities/textFormating";
import { Keyboard } from "react-native";
import { showSuccess, showError } from "@/Utilities/messages";
import {
  setCountIncludesChecked,
  toggleSetOrderByChecked,
  toggleSetOrderByNew,
} from "@/data/db/dbRepoSettings";
import { externalRefreshCallbackMainLists } from "@/containers/mainListsContainer";
import {
  getSectionListsByMainListId,
  refreshCallback,
} from "./sectionListsContainer";
import { getActiveMainListId } from "@/data/db/dbRepoList";
import { refreshItemsForSection } from "./itemsContainer";

export const isTitleValidContainer = (title: string): boolean => {
  if (
    isNotWhitespace(title) &&
    capitalizeFirst(title) !== dbRepoSettings.getDefaultSectionName()
  )
    return true;
  else return false;
};

export const saveDefaultSectionTitleValidation = (title: string) => {
  if (isTitleValidContainer(title)) {
    showSuccess("Default section title updated");
    dbRepoSettings.setDefaultSectionName(capitalizeFirst(title).trim());
  } else showError("Same title. No change made.");
  Keyboard.dismiss();
};

export const toggleDisplayOrderContainer = () => {
  toggleSetOrderByNew();
  externalRefreshCallbackMainLists();
  refreshItems();
};

export const toggleSetOrderByCheckedContainer = () => {
  toggleSetOrderByChecked();
  refreshItems();
};

const refreshItems = async () => {
  const mainListID = await getActiveMainListId();
  if (mainListID) {
    const visibleSectionlist = await getSectionListsByMainListId(mainListID);
    visibleSectionlist.forEach((section) => {
      refreshItemsForSection(section.id);
    });
  }
};

export const changeCountIncludeCount = (
  val: boolean,
  setCountMode: (val: boolean) => void
) => {
  setCountIncludesChecked(val);
  setCountMode(val);
  refreshItems();
};
