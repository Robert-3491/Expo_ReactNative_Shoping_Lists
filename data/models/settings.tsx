export class Settings {
  id: number;
  defaultSectionName: string;
  closeModalOnAdd: boolean;
  orderByChecked: boolean;

  constructor(
    id: number,
    defaultSectionName: string,
    closeModalOnAdd: boolean,
    orderByChecked: boolean
  ) {
    this.id = id;
    this.defaultSectionName = defaultSectionName;
    this.closeModalOnAdd = closeModalOnAdd;
    this.orderByChecked = orderByChecked;
  }
}
