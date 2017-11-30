import { Component, OnInit } from '@angular/core';
import {ImageCollection} from '../_models/collection';
import {User} from '../_models/user';
import {CollectionService} from '../_services/collection.service';
import {AuthService} from '../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {
  public imageCollection: ImageCollection;
  public currentUser: User;
  public editMode = false;

  constructor(public collectionService: CollectionService,
              public authService: AuthService,
              public router: Router,
              public route: ActivatedRoute) {
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
    }
  }

}
