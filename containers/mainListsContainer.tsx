import { MainList } from "@/data/models/mainList";

let mainLists: MainList[] = [
  new MainList("New List"),
  new MainList("New List1"),
  new MainList("New List2"),
];

export const setMainLists = (newMainLists: MainList[]) => {
  mainLists = newMainLists;
  const newList = new MainList("New List");
  mainLists.push(newList);
};

export const getMainLists = (): MainList[] => {
  return mainLists;
};
