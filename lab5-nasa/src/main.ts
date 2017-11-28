import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// mongod --dbpath /Users/tomiwaademidun/Desktop/tomiwa/codeproj/practice/se-3316-webtech/oademid-se3316-lab5/lab5-nasa/server/data
// "build": "ng build && node server/server.js",

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
