import { MainList } from "@/data/models/mainList";
import { SectionList } from "@/data/models/sectionList";

export const getSectionContentCount = (sectionList: SectionList): string => {
  if (!sectionList.itemsCount) return "Empty section";
  const formatedText = `${sectionList.checkedItemsCount}/${sectionList.itemsCount} items checked`;
  return formatedText;
};

export const getMainListContentCount = (mainList: MainList): string => {
  return "getMainListContentCount";
};
