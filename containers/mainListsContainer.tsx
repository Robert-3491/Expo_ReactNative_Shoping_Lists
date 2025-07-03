import { MainList } from "@/data/models/mainList";

let mainLists: MainList[] = [];

// export const setMainLists = (newMainLists: MainList[]) => {
// };

export function SetInactiveLists() {
  mainLists.forEach((list) => {
    list.isActive = false; // Set all existing lists to inactive
  });
}

export const addMainList = (newMainList: MainList) => {
  SetInactiveLists();
  mainLists = [...mainLists, newMainList]; //This will make the update reactive
};

export const getMainLists = (): MainList[] => {
  return mainLists;
};
