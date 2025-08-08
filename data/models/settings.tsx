export class Settings {
  id: number;
  defaultSectionName: string;
  createDefaultSection: boolean;
  closeModalOnAdd: boolean;
  orderByChecked: boolean;
  orderByNew: boolean;
  countIncludesChecked: boolean;

  constructor(
    id: number,
    defaultSectionName: string,
    createDefaultSection: boolean,
    closeModalOnAdd: boolean,
    orderByChecked: boolean,
    orderByNew: boolean,
    countIncludesChecked: boolean
  ) {
    this.id = id;
    this.defaultSectionName = defaultSectionName;
    this.createDefaultSection = createDefaultSection;
    this.closeModalOnAdd = closeModalOnAdd;
    this.orderByChecked = orderByChecked;
    this.orderByNew = orderByNew;
    this.countIncludesChecked = countIncludesChecked;
  }
}
