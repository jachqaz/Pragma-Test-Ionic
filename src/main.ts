import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/presentation/app.component';
import {appConfig} from './app/presentation/app.config';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './environments/firebase.config';
import {FirebaseRemoteConfigService} from './app/data/services/firebase-remote-config.service';

initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, appConfig)
  .then(async (appRef) => {
    const remoteConfig = appRef.injector.get(FirebaseRemoteConfigService);
    await remoteConfig.initializeConfig();
  })
  .catch(err => console.error(err));
