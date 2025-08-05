import { MainList } from "@/data/models/mainList";
import { SectionList } from "@/data/models/sectionList";

export const getSectionContentCount = (sectionList: SectionList): string => {
  if (!sectionList.itemsCount) return "Empty section";
  const formatedText = `${sectionList.checkedItemsCount}/${sectionList.itemsCount} items checked`;
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
