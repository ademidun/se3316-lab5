import {Component, OnInit} from '@angular/core';
import {ImageCollection} from '../_models/collection';
import {User} from '../_models/user';
import {CollectionService} from '../_services/collection.service';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  public imageCollection: ImageCollection;
  public currentUser: User;

  constructor(public collectionService: CollectionService,
              public authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(`currentUser ${this.currentUser}:`, this.currentUser);
    this.imageCollection = new ImageCollection(this.currentUser._id, '', '');
  }

  createCollection() {

    this.collectionService.createCollection(this.imageCollection)
      .subscribe(
        (res: ImageCollection) => {
          console.log('collectionService.createCollection res', res);
          this.currentUser.collections.push(res._id);

          this.authService.update(this.currentUser)
            .subscribe(
              res => {
                this.router.navigate(['nasa-collection']);
              }
            );
        }
      );
  }

}
