import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {LoginComponent} from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CollectionsListComponent} from './collections-list/collections-list.component';
import {CollectionDetailComponent} from './collection-detail/collection-detail.component';
import {CreateCollectionComponent} from './create-collection/create-collection.component';
import {NasaCollectionComponent} from './nasa-collection/nasa-collection.component';
import {MyCollectionsComponent} from './my-collections/my-collections.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CollectionsListComponent,
    CollectionDetailComponent,
    CreateCollectionComponent,
    NasaCollectionComponent,
    MyCollectionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}