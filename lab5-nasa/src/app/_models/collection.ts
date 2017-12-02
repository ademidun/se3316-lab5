export class ImageCollection {
  _id?: any;
  user?: any;
  description?: string;
  title?: string;
  images?: any[];
  private_view?: boolean;
  dmca_block?: boolean;
  dmca_message?: string;
  dmca_dispute?: string;
  /**
   * ratings = [ "user_id" : <rating>, "user2_id": <rating>]
   */
  ratings?: any[];
  rating_average?: number;

  constructor(user?: any, title?: string, description?: string) {
    this.user = user;
    this.description = description ? description : '';
    this.title = title ? title : '';
    this.private_view = true;
    this.images = [];
    this.ratings = [];
    this.rating_average = 5;
    this.dmca_block = false;
    this.dmca_message = '';
    this.dmca_dispute = '';
  }

  // TODO make this less repetitive and combine into one method? Or is 2 seperate methods more modular and better?

}
