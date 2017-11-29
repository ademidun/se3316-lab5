import {Component, OnInit} from '@angular/core';
import {ImageCollection} from '../_models/collection';
import {User} from '../_models/user';
import {CollectionService} from '../_services/collection.service';
import {AuthService} from '../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  public imageCollection: ImageCollection;
  public currentUser: User;
  public editMode = false;

  constructor(public collectionService: CollectionService,
              public authService: AuthService,
              public router: Router,
              public route: ActivatedRoute,) {
  }

  ngOnInit() {


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(`currentUser ${this.currentUser}:`, this.currentUser);

    const collectionId = this.route.snapshot.params['id'];

    if (collectionId) {
      this.editMode = true;
      this.collectionService.getById(collectionId)
        .subscribe(
          res => {
            console.log('collectionService.getById :', res);
            this.imageCollection = res;
          },
          err => {
            console.log('error incollectionService.getById :', err);
          }
        );
    } else {
      this.imageCollection = new ImageCollection(this.currentUser._id, '', '');
    }
  }

  createCollection() {

    this.collectionService.createCollection(this.imageCollection)
      .subscribe(
        (res: ImageCollection) => {
          console.log('collectionService.createCollection res', res);
          this.currentUser.collections.push(res._id);
          console.log('create collection updateUser this.currentUser:', this.currentUser);
          this.authService.update(this.currentUser)
            .subscribe(
              res2 => {
                console.log('create collection updateUser res:', res2);
                this.router.navigate(['nasa-collection']);
              },
              error2 => {
                console.log('create collection updateUser err:', error2);
              }
            );
        },
        err => {
          console.log('create collection response err:', err);
        }
      );
  }

  saveCollection() {

    this.collectionService.update(this.imageCollection)
      .subscribe(
        res => {
          console.log('saved collection res: ', res);
        }
      );
  }
}
