import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new User();
  loading = false;
  isRegistered;

  constructor(private router: Router,
              private authService: AuthService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.model.collections = [];


    this.authService.create(this.model)
      .subscribe(
        res => {
          this.loading = false;
          console.log('register.component.successful account creation', res);
          this.isRegistered = (<any>res).message;
          // this.router.navigate(['nasa-collection']);
        },
        error => {
          this.loading = false;
          console.log('authService.create error', error);
          this.snackBar.open('Email is already taken', '', {
            duration: 3000
          });
        });
  }
}
