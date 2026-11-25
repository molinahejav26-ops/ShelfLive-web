import {
  ApplicationConfig,
  Injector,
  inject,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
  runInInjectionContext,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(NgbModule),
    {
      provide: NgbModal,
      useFactory: () => runInInjectionContext(inject(Injector), () => new NgbModal()),
    },
  ],
};
