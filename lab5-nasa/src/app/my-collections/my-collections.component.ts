import {Component, OnInit} from '@angular/core';
import {CollectionService} from '../_services/collection.service';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {

  userCollections: any[];
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
          console.log('res', res);
          this.userCollections = res;
        },
        error2 => console.log('collections error', error2),
      );

    this.collectionService.getUserCollections(this.currentUser._id)
      .subscribe(
        res => {
          console.log('mycollectionscomponent getUserCollections,', res);
          },
          err => {
            console.log('mycollectionscomponent getUserCollections, err', err);
          }
      );
  }

}
