export class Item {
  id: number = 0;
  sectionListId: number;
  title: string;
  link: string;
  isChecked: boolean;

  constructor(
    title: string,
    sectionListId: number,
    isChecked: boolean = false,
    link?: string,
    id?: number
  ) {
    this.title = title;
    this.sectionListId = sectionListId;
    this.link = link ? link : "";
    this.isChecked = isChecked;
    this.id = id ? id : 0;
  }
}
