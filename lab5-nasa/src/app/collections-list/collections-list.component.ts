import {Component, OnInit} from '@angular/core';
import {CollectionService} from '../_services/collection.service';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {ImageCollection} from '../_models/collection';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.css']
})
export class CollectionsListComponent implements OnInit {


  publicCollections: ImageCollection[];
  currentUser: User;
  userId;
  collectionRating = 5;
  disputeMessage;

  // onRatingChangeResult:OnRatingChangeEven;
  constructor(public authService: AuthService,
              public collectionService: CollectionService) {
  }

  ngOnInit() {

    this.currentUser = this.authService.getUser();
    this.collectionService.getAllCollections()
      .subscribe(
        res => {
          console.log('mycollectionscomponent getUserCollections,', res);
          this.publicCollections = res;

          for (let i = 0; i < this.publicCollections.length; i++) {
            if (!this.publicCollections[i].rating_average) {
              this.publicCollections[i].rating_average = 5;
            }
            if (!this.publicCollections[i].rating_average) {
              this.publicCollections[i].rating_average = 5;
            }
          }
          // sort collections by rating average descending
          this.publicCollections.sort(function (collection1, collection2) {
            return collection2.rating_average - collection1.rating_average;
          });

          this.publicCollections = this.publicCollections.slice(0, 10);


        },
        err => {
          console.log('mycollectionscomponent getUserCollections, err', err);
        }
      );
  }

  saveRating(ratingScore, index) {

    if (!this.publicCollections[index].ratings) {
      this.publicCollections[index].ratings = [];
      this.publicCollections[index].rating_average = ratingScore;
    }


    // remove the null values from array
    this.publicCollections[index].ratings.filter(x => x);


    // quick fix for a bug because some rating_averages are already null in the database

    if (!this.publicCollections[index].rating_average || this.publicCollections[index].rating_average <= 1) {
      this.publicCollections[index].rating_average = ratingScore;
    }
    const entry = {};
    entry[this.currentUser._id] = ratingScore;

    let alreadyRated = false;
    let prevRatingIndex = 0;

    for (; prevRatingIndex < this.publicCollections[index].ratings.length; prevRatingIndex++) {
      const elem = this.publicCollections[index].ratings[prevRatingIndex];

      for (const key in elem) {
        if (this.currentUser._id === key) {
          alreadyRated = true;
        }
      }

      if (alreadyRated) {
        break;
      }


    }
    this.publicCollections[index].ratings.splice(prevRatingIndex, 1);

    this.publicCollections[index].ratings.push(entry);

    const N = this.publicCollections[index].ratings.length;

    /* TODO: figure out the proper algorithm
    this.publicCollections[index].rating_average = ( (N - 1) / N) * this.publicCollections[index].rating_average +
      ratingScore / N;
     */

    let sum = 0;

    for (let i = 0; i < this.publicCollections[index].ratings.length; i++) {
      const elem = this.publicCollections[index].ratings[i];

      for (const val in elem) {
        if (elem.hasOwnProperty(val)) {
          sum += elem[val];
        }
      }


    }

    this.publicCollections[index].rating_average = sum / N;

    this.collectionService.update(this.publicCollections[index]).subscribe(
      res => {
        console.log('collectionlist.SaveRating() res:', res);
      }
    );

  }

  fileComplaint(index) {

    this.publicCollections[index].dmca_message = this.disputeMessage;
    this.publicCollections[index].dmca_block = true;

    this.collectionService.update(this.publicCollections[index]).subscribe(
      res => {
        console.log('collectionlist.SaveRating() res:', res);
      }
    );

  }
}
