import {Component, OnInit} from '@angular/core';
import {NasaImage} from '../_models/nasa-image';
import {CollectionService} from '../_services/collection.service';
import {ImageCollection} from '../_models/collection';
import {MatCheckbox} from '@angular/material';

@Component({
  selector: 'app-nasa-collection',
  templateUrl: './nasa-collection.component.html',
  styleUrls: ['./nasa-collection.component.css']
})
export class NasaCollectionComponent implements OnInit {

  nasaImages: NasaImage[];
  userCollections: ImageCollection[];
  searchTerm: string;

  constructor(public collectionService: CollectionService) {
    this.nasaImages = [];
    // TODO make this into a service
    this.userCollections = [];
    for (let i = 0; i < 5; i++) {
      const userCollection = new ImageCollection(1, i + 'Title', i + 'Description');
      this.userCollections.push(userCollection);
    }
  }

  ngOnInit() {
    this.sendQuery();
  }

  sendQuery() {
    this.searchTerm = this.searchTerm ? this.searchTerm : 'nasa';
    this.collectionService.getNasaCollections(this.searchTerm)
      .subscribe(
        res => {
          const resLength = res.collection.items.length < 10 ? res.collection.items.length : 10;
          const nasaObjects: any[] = res.collection.items.slice(0, resLength);

          this.nasaImages.length = 0;
          nasaObjects.forEach(nasaObject => {

            const nasaImage = new NasaImage(nasaObject);
            this.nasaImages.push(nasaImage);

          });
        });
    this.searchTerm = '';
  }

  addCollection(nasaImage: NasaImage, index?: number, checkBoxEl?: MatCheckbox) {
    // TODO, check for duplicate collections and match selection with element

    console.log('addCollection nasaImage', nasaImage, index, checkBoxEl.checked, this.userCollections[index].images.includes(nasaImage.href));

    if (!checkBoxEl.checked && !this.userCollections[index].images.includes(nasaImage.href)) {
      this.userCollections[index].images.push(nasaImage.href);
    }

    if (checkBoxEl.checked) {
      const findIndex = this.userCollections[index].images.indexOf(nasaImage.href);
      this.userCollections[index].images.splice(findIndex, 1);
    }
    console.log('addCollection this.userCollections', this.userCollections[index]);

  }
}
