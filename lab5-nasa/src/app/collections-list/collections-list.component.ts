import { Component, OnInit } from '@angular/core';
import {CollectionService} from '../_services/collection.service';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.css']
})
export class CollectionsListComponent implements OnInit {


  publicCollections: any[];
  currentUser: User;
  constructor(
    public authService: AuthService,
    public collectionService: CollectionService) {
  }

  ngOnInit() {

    this.currentUser = this.authService.getUser();

    this.collectionService.getAllCollections()
      .subscribe(
        res => {
          console.log('mycollectionscomponent getUserCollections,', res);
          this.publicCollections = res;
        },
        err => {
          console.log('mycollectionscomponent getUserCollections, err', err);
        }
      );
  }

}
