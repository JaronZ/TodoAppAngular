import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {TODO_SERVICE} from './token';
import {TodoHardcodedService} from './todo-hardcoded-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: TODO_SERVICE, useClass: TodoHardcodedService }
  ]
};
