import { ApplicationConfig, Provider, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { FileDataService } from './services/file-data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    FileDataService,
    FileDataService,
    importProvidersFrom(HttpClientModule),
  ],
};
