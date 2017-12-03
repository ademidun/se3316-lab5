import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new User();
  loading = false;
  returnUrl: string;
  myJson = JSON;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService,
              public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(f: HTMLFormElement) {
    console.log(this.model);
    console.log('form f:', f);
      this.loading = true;
      this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
          res => {
            console.log('login.component.authenticationService.login res', res);
            console.log('returnUrl', this.returnUrl);
            // if (this.returnUrl) {
            //   this.router.navigate([this.returnUrl]);
            // } else {
            //   this.router.navigate(['my-collections']);
            // }
            this.router.navigate(['/my-collections']);
          },
          (error: any) => {
            this.loading = false;
            console.log('login.component.authenticationService.login error', error);
            this.snackBar.open('Incorrect login credentials:' + error.message, '', {
              duration: 3000
            });
          });
    }
}
