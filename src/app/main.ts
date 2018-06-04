import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
//import { ENV } from '@app/env';


// console.log('ENV.mode is: ' + ENV.mode);
// if (ENV.mode === 'Production') {
    enableProdMode();
  //}

platformBrowserDynamic().bootstrapModule(AppModule);
