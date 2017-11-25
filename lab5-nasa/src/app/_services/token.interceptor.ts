import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
// https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

// cyclic dependency https://github.com/angular/angular/issues/18224
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public inj: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `JWT ${currentUser.token}`,
        }
      });
    }

    console.log('TokenInterceptor.intercept req:', req);
    return next.handle(req);
  }
}
