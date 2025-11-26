import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {provideAnimations} from '@angular/platform-browser/animations';

import {routes} from './app.routes';
import {TodoRepository} from '../domain/repositories/todo.repository';
import {CategoryRepository} from '../domain/repositories/category.repository';
import {RemoteConfigRepository} from '../domain/repositories/remote-config.repository';
import {TodoRepositoryImpl} from '../data/repositories/todo.repository.impl';
import {CategoryRepositoryImpl} from '../data/repositories/category.repository.impl';
import {FirebaseRemoteConfigService} from '../data/services/firebase-remote-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(IonicModule.forRoot()),
    {provide: TodoRepository, useClass: TodoRepositoryImpl},
    {provide: CategoryRepository, useClass: CategoryRepositoryImpl},
    {provide: RemoteConfigRepository, useClass: FirebaseRemoteConfigService}
  ]
};
