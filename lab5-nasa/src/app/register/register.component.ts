import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.authService.create(this.model)
      .subscribe(
        data => {
          console.log('succesful account creation', data);
          this.router.navigate(['/nasa-collection']);
        },
        error => {
          this.loading = false;
        });
  }
}
