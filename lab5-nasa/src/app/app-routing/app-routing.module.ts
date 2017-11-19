import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {CollectionsListComponent} from '../collections-list/collections-list.component';
import {CollectionDetailComponent} from '../collection-detail/collection-detail.component';
import {CreateCollectionComponent} from '../create-collection/create-collection.component';
import {NasaCollectionComponent} from '../nasa-collection/nasa-collection.component';
import {MyCollectionsComponent} from '../my-collections/my-collections.component';

const routes: Routes = [

  {path: '', component: HomeComponent, data: {title: 'Nasa App'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'collections-list', component: CollectionsListComponent, data: {title: 'Login'}},
  {path: 'collection-detail/:id', component: CollectionDetailComponent, data: {title: 'Collection Detail'}},
  {path: 'create-collection', component: CreateCollectionComponent, data: {title: 'Create Collection'}},
  {path: 'nasa-collection', component: NasaCollectionComponent, data: {title: 'Nasa Collection'}},
  {path: 'my-collections', component: MyCollectionsComponent, data: {title: 'My Collections'}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
