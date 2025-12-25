import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { registerLocaleData } from '@angular/common';
import localeEnIN from '@angular/common/locales/en-IN';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEnIN, 'en-IN');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
}).catch(err => console.error(err));
