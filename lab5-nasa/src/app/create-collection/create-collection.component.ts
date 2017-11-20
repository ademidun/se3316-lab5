import {Component, OnInit} from '@angular/core';
import {ImageCollection} from '../_models/collection';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  public imageCollection: ImageCollection;

  constructor() {
  }

  ngOnInit() {
    this.imageCollection = new ImageCollection(0, '', '' );
  }

}
