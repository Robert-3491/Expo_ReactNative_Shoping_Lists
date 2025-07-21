export class Settings {
  id: number;
  defaultSectionName: string;
  createDefaultSection: boolean;
  closeModalOnAdd: boolean;
  orderByChecked: boolean;

  constructor(
    id: number,
    defaultSectionName: string,
    createDefaultSection: boolean,
    closeModalOnAdd: boolean,
    orderByChecked: boolean
  ) {
    this.id = id;
    this.defaultSectionName = defaultSectionName;
    this.createDefaultSection = createDefaultSection;
    this.closeModalOnAdd = closeModalOnAdd;
    this.orderByChecked = orderByChecked;
  }
}
