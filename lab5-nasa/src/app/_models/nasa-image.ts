export class NasaImage {
  nasa_id?: string;
  description?: string;
  title?: string;
  href?: string;

  constructor(nasaObject: any) {
    this.nasa_id = nasaObject.data[0].nasa_id;
    this.title = nasaObject.data[0].title;
    this.description = nasaObject.data[0].description;
    this.href = nasaObject.links[0].href;
  }

  // TODO make this less repetitive and combine into one method? Or is 2 seperate methods more modular and better?

}
