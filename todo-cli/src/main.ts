import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModuleA } from './app/app.module.type1';
import { AppModuleB } from './app/app.module.type2';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModuleA);
