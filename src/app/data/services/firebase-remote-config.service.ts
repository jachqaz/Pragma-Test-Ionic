import {Injectable, signal, Signal} from '@angular/core';
import {fetchAndActivate, getBoolean, getRemoteConfig, RemoteConfig} from 'firebase/remote-config';
import {RemoteConfigRepository} from '../../domain/repositories/remote-config.repository';

@Injectable({providedIn: 'root'})
export class FirebaseRemoteConfigService extends RemoteConfigRepository {
  private remoteConfig: RemoteConfig;

  // Private signals for reactive state
  private _enableAddTask = signal<boolean>(true);
  private _enableManagementCategories = signal<boolean>(true);
  private _enableDarkMode = signal<boolean>(false);

  constructor() {
    super();
    this.remoteConfig = getRemoteConfig();
    this.setDefaults();
  }

  async initializeRemoteConfig(): Promise<void> {
    await this.initializeConfig();
  }

  async initializeConfig(): Promise<void> {
    // Set fetch interval: 5s for development, 3600s for production
    this.remoteConfig.settings.minimumFetchIntervalMillis =
      window.location.hostname === 'localhost' ? 5000 : 3600000;

    await fetchAndActivate(this.remoteConfig);

    // Update signals with activated Firebase values
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

  getEnableDarkMode(): Signal<boolean> {
    return this._enableDarkMode.asReadonly();
  }

  // Repository interface methods
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
