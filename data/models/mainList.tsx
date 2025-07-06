export class MainList {
  id: number = 0;
  title: string;
  isActive: boolean;
  isEditing: boolean = false; // Flag to indicate if the list is being edited

  constructor(title: string, isActive: boolean = false, id?: number) {
    this.title = title;
    this.isActive = isActive;
    this.id = id ? id : 0; // If id is not provided, default to 0
  }
}
