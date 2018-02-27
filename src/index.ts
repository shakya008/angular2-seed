import 'babel-polyfill';
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (process.env.NODE_ENV !== 'test') {
    platformBrowserDynamic().bootstrapModule(AppModule);
}
