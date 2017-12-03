import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public verifyMode = false;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {

    const checkRoute = this.route.snapshot.params['id'];

    if (checkRoute) {

      this.verifyMode = true;
    }
  }

  login() {
  }

}
