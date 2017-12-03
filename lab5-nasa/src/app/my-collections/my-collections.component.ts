import {Component, OnInit} from '@angular/core';
import {CollectionService} from '../_services/collection.service';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {

  userCollections = [];
  currentUser: User;
  myJson = JSON;

  constructor(public authService: AuthService,
              public collectionService: CollectionService,
              public router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.currentUser = this.authService.getUser();
    if (!this.currentUser) {

      this.snackBar.open('Please Log in:', '', {
        duration: 3000
      });

      setTimeout(
        this.router.navigate(['']), 3250);

    } else {
      this.collectionService.getUserCollections(this.currentUser._id)
        .subscribe(
          res => {
            console.log('mycollectionscomponent getUserCollections,', res);
            this.userCollections = res;

          },
          err => {
            console.log('mycollectionscomponent getUserCollections, err', err);
          }
        );


    }


  }

}
