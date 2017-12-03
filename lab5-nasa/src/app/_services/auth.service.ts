import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../_models/user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public serverApi = environment.serverApi;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(this.serverApi + 'users/authenticate', {email: email, password: password})
      .map((response: HttpResponse<any>) => {
        // login successful if there's a jwt token in the response
        console.log('auth.service.login, response', response);
        const user = <any>response;
        if (user && user.token) {

          console.log('auth.service.login, user.token', user.token);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      })
      .catch(err => err);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getById(_id: string) {
    return this.http.get('users/' + _id)
      .map(res => {
        console.log('auth.service getById res:', res);
        return res;
      })
      .catch(err => {

        console.log('auth.service getById res:', err);
        return err;
      });
  }

  create(user: User) {
    console.log('auth.service.create', user);
    return this.http.post('users/register', user)
      .map(res => res)
      .catch(err => err);
  }

  update(user: User) {
    console.log('Just called auth.service.update user:', user);
    return this.http.put('users/' + user._id, user)
      .map(
        res => {
          console.log('AuthService.update res:', res);
          localStorage.setItem('currentUser', JSON.stringify(res));
          return res;
        }
      )
      .catch(err => {
        console.log('AuthService.update err:', err);
        return err;
      });
  }

  delete(_id: string) {
    return this.http.delete('/users/' + _id);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
