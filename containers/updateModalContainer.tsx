import { updateSection } from "@/containers/sectionListsContainer";

export const modalUpdateItem = () => {
  console.log("Item");
};

export const modalUpdateSection = (
  sectionId: number,
  title: string,
  modalClosingBehaviour: () => void
) => {
  updateSection(sectionId, title);
  console.log("Sec");
  modalClosingBehaviour();
};
