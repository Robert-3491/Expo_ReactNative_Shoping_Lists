import * as dbRepoSettings from "@/data/db/dbRepoSettings";
import { isNotWhitespace, capitalizeFirst } from "@/Utilities/textFormating";
import { Keyboard } from "react-native";
import { showSuccess } from "@/Utilities/messages";

export const isTitleValidContainer = (title: string): boolean => {
  if (
    isNotWhitespace(title) &&
    capitalizeFirst(title) !== dbRepoSettings.getDefaultSectionName()
  )
    return true;
  else return false;
};

export const saveDefaultSectionTitle = (title: string) => {
  dbRepoSettings.setDefaultSectionName(capitalizeFirst(title));
  showSuccess("Default section title updated");
  Keyboard.dismiss();
};
