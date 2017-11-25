import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class CollectionService {

  public nasaApi = environment.nasaApi;

  constructor(public http: HttpClient) {
  }

  getAllCollections() {
    return this.http.get('/api/posts')
      .map(res => {
        console.log('collection service res', <any>res);
        return <any>res;
      });

  }

  getNasaCollections(query ?: string) {
    query = query ? query : 'nasa';
    return this.http.get(`${this.nasaApi}/search?q=${query}&media_type=image`)
      .map(res => {
        console.log('collection service res', <any>res);
        return <any>res;
      });
  }

}
