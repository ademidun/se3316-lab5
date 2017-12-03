import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  editMode = false;
  adminUser: User | any;
  isAdmin = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {

    const currentUser = this.authService.getUser();
    this.authService.getById('5a1db7ab8190c0134048f789')
      .subscribe(
        res => {
          this.adminUser = res;

          console.log('retrieved admin user this.adminUser:', res);
          console.log('retrieved admin user res:', res);

          if (currentUser && currentUser._id === '5a1db7ab8190c0134048f789') {
            this.isAdmin = true;
          }
          /*
          this.adminUser.privacy_policy = ` Effective Date: December 3, 2017
          Lab 5 Nasa’s privacy policies explain how we treat your personal data and protect your privacy
           when you use our Services.
          By using our Services, you agree that Lab 5 Nasa can use such data in accordance with our privacy policies.
          By using our Services, you agree that Lab 5 Nasa can use such data in accordance with our privacy policies.

          We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers
          according to the process set out in the
          U.S. Digital Millennium Copyright Act.

          We provide information to help copyright holders manage their intellectual property online.
          If you think somebody is violating your copyrights and want to notify us, you can find information
           about submitting notices and
          Lab 5 Nasa’s policy about responding to notices in our Help Center.`;

          this.adminUser.security_policy = ` We work hard to protect Lab 5 Nasa and our users from unauthorized
           access to or unauthorized alteration,
         disclosure or destruction of information we hold. In particular:
         We encrypt many of our services using SSL.
         We offer you email verification when you access your Lab 5 Nasa Account, and a Safe Browsing feature in Lab 5 Nasa Chrome.
         We review our information collection, storage and processing practices, including physical security measures, to guard against
         unauthorized access to systems.
         We restrict access to personal information to Lab 5 Nasa employees, contractors and agents who need to know that information in order to
         process it for us, and who
         are subject to strict contractual confidentiality obligations and may be disciplined or terminated if they fail to meet these obligations.`;

          this.authService.update(this.adminUser)
            .subscribe(
              res2 => {
                console.log('authService.update res2:', res2);
              },

              err => {
                console.log('authService.update err:', err);
              }
            );

          if (currentUser && currentUser._id === '5a1db7ab8190c0134048f789') {
            this.isAdmin = true;
          }
           */

        },
      );


  }

  savePolicyEdits() {
    this.authService.update(this.adminUser)
      .subscribe(
        res2 => {
          console.log('authService.update res2:', res2);
        },

        err => {
          console.log('authService.update err:', err);
        }
      );
  }

  scrollTo(location: string): void {
    window.location.hash = location;
  }

}
