import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {ImageCollection} from '../_models/collection';

@Injectable()
export class CollectionService {

  public nasaApi = environment.nasaApi;

  constructor(public http: HttpClient) {
  }

  getAllCollections() {
    return this.http.get('collections')
      .map(res => {
        console.log('collection service res', <any>res);
        return <any>res;
      });

  }

  filter(filterParams) {
    return this.http.post('collections/filter', filterParams )
      .map(res => {
        console.log('collection service filter res', <any>res);
        return <any>res;
      });

  }


  getUserCollections(userId) {
    return this.http.get(`collections/user-collections/${userId}`)
      .map(res => {
        console.log('collection service res', res);
        return <any>res;
      })
      .catch( err => {
        console.log('collection service err', err);
        return <any>err;
      });
  }

  getById(userId) {
    return this.http.get(`collections/${userId}`)
      .map(res => {
        console.log('collection service res', res);
        return <any>res;
      })
      .catch( err => {
        console.log('collection service err', err);
        return <any>err;
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

  createCollection(collection: ImageCollection) {
      return this.http.post('collections/create', collection)
        .map(res => res)
        .catch(err => err);
    }


  update(collection: ImageCollection) {

    return this.http.put('collections/' + collection._id, collection)
      .map(
        res => {
          console.log('collection.update res:', res);
          return res;
        }
      );
  }

  delete(_id: any) {

    return this.http.delete('collections/' + _id)
      .map(
        res => {
          console.log('collection.update res:', res);
          return res;
        }
      );
  }

}
