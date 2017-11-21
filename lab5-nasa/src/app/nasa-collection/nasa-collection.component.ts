import {Component, OnInit} from '@angular/core';
import {NasaImage} from '../_models/nasa-image';
import {CollectionService} from '../_services/collection.service';

@Component({
  selector: 'app-nasa-collection',
  templateUrl: './nasa-collection.component.html',
  styleUrls: ['./nasa-collection.component.css']
})
export class NasaCollectionComponent implements OnInit {

  nasaImages: NasaImage[];
  searchTerm: string;

  constructor(public collectionService: CollectionService) {
    this.nasaImages = new Array<NasaImage>();
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
}
