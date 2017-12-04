import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  currentUser: any;
  myJson = JSON;

  constructor(public authService: AuthService,
              public collectionService: CollectionService,
              public router: Router,
              public snackBar: MatSnackBar,
              public cdr: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.currentUser = this.authService.getUser();
    if (!this.currentUser) {

      this.snackBar.open('Please Log in:', '', {
        duration: 3000
      });

      // prevent expressionchanged after its been checked error
      this.cdr.detectChanges();
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

  verifyAccount() {
    this.authService.verify(this.currentUser)
      .subscribe(
        res => {
          console.log('my collections verify res', res);
        },
        err => {
          console.log('update after verify err', err);
        }
      );
  }

}
