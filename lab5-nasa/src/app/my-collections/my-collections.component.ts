import {Component, OnInit} from '@angular/core';
import {CollectionService} from '../_services/collection.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {

  userCollections: any[];

  constructor(public collectionService: CollectionService) {
  }

  ngOnInit() {
    this.collectionService.getAllCollections()
      .subscribe(
        res => {
          console.log('res', res);
          this.userCollections = res;
        },
        error2 => console.log('collections error', error2),
      );
  }

}
