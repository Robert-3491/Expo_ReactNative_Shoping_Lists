export class SectionList {
  id: number = 0;
  mainListId: number;
  title: string;
  isVisible: boolean;
  isEditing: boolean = false; // Flag to indicate if the list is being edited
  itemsCount: number = 0;
  checkedItemsCount: number = 0;

  constructor(
    title: string,
    isVisible: boolean = false,
    mainListId: number,
    id?: number,
    itemsCount?: number,
    checkedItemsCount?: number
  ) {
    this.title = title;
    this.isVisible = isVisible;
    this.id = id ? id : 0; // If id is not provided, default to 0
    this.mainListId = mainListId;
    this.itemsCount = itemsCount ? itemsCount : 0;
    this.checkedItemsCount = checkedItemsCount ? checkedItemsCount : 0;
  }
}
