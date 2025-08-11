import { getCountIncludesChecked } from "@/data/db/dbRepoSettings";
import { MainList } from "@/data/models/mainList";
import { SectionList } from "@/data/models/sectionList";

export const getSectionContentCount = (sectionList: SectionList): string => {
  let formatedText = "";
  const itemFormating = (): string => {
    if (sectionList.itemsCount === 1) {
      return "item";
    } else return "items";
  };
  if (!sectionList.itemsCount) {
    formatedText = "Empty section";
    return formatedText;
  }

  if (getCountIncludesChecked()) {
    formatedText = `${sectionList.checkedItemsCount}/${
      sectionList.itemsCount
    } ${itemFormating()} checked`;
  } else {
    formatedText = `${sectionList.itemsCount} ${itemFormating()}`;
  }
  return formatedText;
};

export const getMainListContentCount = (mainList: MainList): string => {
  if (!mainList.contentCount[0]) return "Empty list";

  const sectionCount = (): string => {
    if (mainList.contentCount[0] === 1) {
      return `${mainList.contentCount[0]} section`;
    }
    return `${mainList.contentCount[0]} sections`;
  };

  const formatedText = `${sectionCount()} with ${
    mainList.contentCount[1]
  } items`;
  return formatedText;
};
