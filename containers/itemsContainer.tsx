import { Item } from "@/data/models/item";
import * as dbRepoItem from "@/data/db/dbRepoItem";

let itemLists: Item[] = [];

export async function initializeSectionLists() {
  itemLists = (await dbRepoItem.getAllItems()).map(
    (item) =>
      new Item(
        item.title,
        item.sectionListId,
        item.isChecked,
        item.link,
        item.id
      )
  );
}

export const getAllItems = (): Item[] => {
  return itemLists;
};
