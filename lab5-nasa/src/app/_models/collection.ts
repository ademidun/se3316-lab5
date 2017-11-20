export class ImageCollection {
  id?: any;
  user?: any;
  description?: string;
  title?: string;
  images?: any[];
  private_view?: boolean;

  constructor(user?: number, title?: string, description?: string) {
    this.user = user;
    this.description = description ? description : '';
    this.title = title ? title : '';
    this.private_view = true;
  }

  // TODO make this less repetitive and combine into one method? Or is 2 seperate methods more modular and better?

}
