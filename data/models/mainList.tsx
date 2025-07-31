export class MainList {
  id: number = 0;
  title: string;
  isActive: boolean;
  contentCount: [sectionCount: number, totalItemsCount: number];

  constructor(
    title: string,
    isActive: boolean = false,
    id?: number,
    contentCount?: [sectionCount: number, totalItemsCount: number]
  ) {
    this.title = title;
    this.isActive = isActive;
    this.id = id ?? 0;
    this.contentCount = contentCount ?? [0, 0];
  }
}
