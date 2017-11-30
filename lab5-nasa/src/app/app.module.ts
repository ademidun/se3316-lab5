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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CollectionService} from './_services/collection.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CollectionCardComponent} from './collection-card/collection-card.component';
import {AuthGuardGuard} from './_guards/auth-guard.guard';
import {TokenInterceptor} from './_services/token.interceptor';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthService} from './_services/auth.service';
import {RegisterComponent} from './register/register.component';
import {MatExpansionModule, MatIconModule, MatSliderModule, MatSnackBarModule} from '@angular/material';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CollectionsListComponent,
    CollectionDetailComponent,
    CreateCollectionComponent,
    NasaCollectionComponent,
    MyCollectionsComponent,
    CollectionCardComponent,
    NavbarComponent,
    RegisterComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatExpansionModule,
    MatSliderModule
  ],
  providers: [CollectionService,
    AuthGuardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
