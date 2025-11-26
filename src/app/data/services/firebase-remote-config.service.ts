import {Injectable, signal, Signal} from '@angular/core';
import {Platform} from '@ionic/angular';
import {fetchAndActivate, getBoolean, getRemoteConfig, RemoteConfig} from 'firebase/remote-config';
import {RemoteConfigRepository} from '../../domain/repositories/remote-config.repository';

@Injectable({providedIn: 'root'})
export class FirebaseRemoteConfigService extends RemoteConfigRepository {
  private remoteConfig: RemoteConfig;

  private _enableAddTask = signal<boolean>(true);
  private _enableManagementCategories = signal<boolean>(true);
  private _enableDarkMode = signal<boolean>(false);

  constructor(private platform: Platform) {
    super();
    this.remoteConfig = getRemoteConfig();
    this.setDefaults();
  }

  async initializeConfig(): Promise<void> {
    // Set fetch interval based on environment and platform
    const isDev = window.location.hostname === 'localhost' || !this.platform.is('cordova');
    this.remoteConfig.settings.minimumFetchIntervalMillis = isDev ? 5000 : 3600000;

    await fetchAndActivate(this.remoteConfig);

    this._enableAddTask.set(getBoolean(this.remoteConfig, 'enableAddTask'));
    this._enableManagementCategories.set(getBoolean(this.remoteConfig, 'enableManagementCategories'));
    this._enableDarkMode.set(getBoolean(this.remoteConfig, 'enableDarkMode'));
  }

  getEnableAddTask(): Signal<boolean> {
    return this._enableAddTask.asReadonly();
  }

  getEnableManagementCategories(): Signal<boolean> {
    return this._enableManagementCategories.asReadonly();
  }

  async getFeatureFlag(key: string): Promise<boolean> {
    return getBoolean(this.remoteConfig, key);
  }

  getFeatureFlagSync(key: string): boolean {
    return getBoolean(this.remoteConfig, key);
  }

  private setDefaults(): void {
    this.remoteConfig.defaultConfig = {
      enableAddTask: true,
      enableManagementCategories: true,
      enableDarkMode: false
    };

    this._enableAddTask.set(true);
    this._enableManagementCategories.set(true);
    this._enableDarkMode.set(false);
  }
}
