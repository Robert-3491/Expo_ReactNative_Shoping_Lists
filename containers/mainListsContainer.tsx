import { MainList } from "@/data/models/mainList";
import { useEffect } from "react";
import * as dbRepo from "@/data/db/dbRepoList";

useEffect(() => {
  initializeMainLists();
}, []);

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

export const deleteMainList = (id: number) => {
  mainLists = mainLists.filter((list) => list.id !== id);
  console.log("MainList deleted:", id);
};

export const getMainLists = (): MainList[] => {
  return mainLists;
};

async function initializeMainLists() {
  mainLists = (await dbRepo.getAllMainLists()).map(
    (list) => new MainList(list.title, list.isActive, list.id)
  );
}
