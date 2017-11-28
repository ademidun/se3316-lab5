export class ImageCollection {
  _id?: any;
  user?: any;
  description?: string;
  title?: string;
  images?: any[];
  private_view?: boolean;

  constructor(user?: any, title?: string, description?: string) {
    this.user = user;
    this.description = description ? description : '';
    this.title = title ? title : '';
    this.private_view = true;
    this.images = [];
  }

  // TODO make this less repetitive and combine into one method? Or is 2 seperate methods more modular and better?

}
