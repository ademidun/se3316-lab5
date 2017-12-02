import {Component, OnInit} from '@angular/core';
import {NasaImage} from '../_models/nasa-image';
import {CollectionService} from '../_services/collection.service';
import {ImageCollection} from '../_models/collection';
import {MatCheckbox} from '@angular/material';
import {User} from '../_models/user';

@Component({
  selector: 'app-nasa-collection',
  templateUrl: './nasa-collection.component.html',
  styleUrls: ['./nasa-collection.component.css']
})
export class NasaCollectionComponent implements OnInit {

  allResults: NasaImage[];
  nasaImages: NasaImage[];
  userCollections: ImageCollection[];
  searchTerm: string;
  currentUser: User;
  currentPage = 1;

  constructor(public collectionService: CollectionService) {
    this.nasaImages = [];
    // TODO make this into a service
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser) {
      this.collectionService.getUserCollections(this.currentUser._id)
        .subscribe(
          res => {
            this.userCollections = res;
          }
        );
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
          this.allResults = res.collection.items;
          const nasaObjects: any[] = res.collection.items.slice(0, resLength);

          this.setImages(nasaObjects);
        });
    this.searchTerm = '';
  }

  addCollection(nasaImage: NasaImage, index?: number, checkBoxEl?: MatCheckbox) {
    // TODO, check for duplicate collections and match selection with element

    console.log('addCollection nasaImage', nasaImage, index, checkBoxEl.checked, this.userCollections[index].images.includes(nasaImage.href));

    if (!checkBoxEl.checked && !this.userCollections[index].images.includes(nasaImage)) {
      this.userCollections[index].images.push(nasaImage);
    }

    if (checkBoxEl.checked) {
      const findIndex = this.userCollections[index].images.indexOf(nasaImage);
      this.userCollections[index].images.splice(findIndex, 1);
    }
    console.log('addCollection this.userCollections', this.userCollections[index]);

  }

  saveCollection() {

    for (let i = 0; i < this.userCollections.length; i++) {

      console.log('saving collection this.userCollections[i]:', this.userCollections[i]);
      this.collectionService.update(this.userCollections[i])
        .subscribe(
          res => {
            console.log('saved collectionService.update res:', res);
          }
        );
    }
  }

  nextPage() {
    this.currentPage += 1;
    const nasaObjects: any[] = this.allResults.slice((this.currentPage - 1) * 10, this.currentPage * 10);

    this.setImages(nasaObjects);

  }

  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
    const nasaObjects: any[] = this.allResults.slice((this.currentPage - 1) * 10, this.currentPage * 10);

    this.setImages(nasaObjects);
  }

  setImages(nasaObjects: any[]) {
    this.nasaImages.length = 0;
    nasaObjects.forEach(nasaObject => {

      const nasaImage = new NasaImage(nasaObject);
      this.nasaImages.push(nasaImage);

    });
  }
}
