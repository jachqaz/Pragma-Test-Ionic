import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/presentation/app.component';
import {appConfig} from './app/presentation/app.config';

// Firebase initialization (uncomment when Firebase is configured)
/*
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate } from 'firebase/remote-config';
import { environment } from './environments/environment';

// Initialize Firebase
const app = initializeApp(environment.firebase);

// Initialize Remote Config
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour

// Set default values
remoteConfig.defaultConfig = {
  enable_categories: true,
  enable_notifications: false,
  enable_dark_mode: true
};

// Fetch and activate remote config
fetchAndActivate(remoteConfig).then(() => {
  console.log('Remote config fetched and activated');
}).catch((err) => {
  console.error('Error fetching remote config:', err);
});
*/

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
