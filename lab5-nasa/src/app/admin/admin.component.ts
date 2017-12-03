import {Component, OnInit} from '@angular/core';
import {ImageCollection} from '../_models/collection';
import {User} from '../_models/user';
import {AuthService} from '../_services/auth.service';
import {CollectionService} from '../_services/collection.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminCollections: ImageCollection[];
  currentUser: User;
  userId;
  collectionRating = 5;
  disputeMessage;

  // onRatingChangeResult:OnRatingChangeEven;
  constructor(public authService: AuthService,
              public collectionService: CollectionService,
              public router: Router,
              public snackBar: MatSnackBar,) {
  }

  ngOnInit() {

    this.currentUser = this.authService.getUser();

    if (this.currentUser && this.currentUser._id !== '5a1db7ab8190c0134048f789') {
      this.snackBar.open('Unauthorized user, redirecting...:', '', {
        duration: 3000
      });

      setTimeout(
        this.router.navigate(['']), 3250);
    }

    this.collectionService.filter({'dmca_block': true})
      .subscribe(
        res => {
          this.adminCollections = res;
        }
      );
  }

  removeBlock(index) {

    this.adminCollections[index].dmca_block = false;

    this.collectionService.update(this.adminCollections[index]).subscribe(
      res => {
        console.log('admin.removeBlock() res:', res);
      }
    );
  }

}
