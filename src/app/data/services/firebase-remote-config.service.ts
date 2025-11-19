import {Injectable} from '@angular/core';

// Real Firebase Remote Config implementation
@Injectable({providedIn: 'root'})
export class FirebaseRemoteConfigService {
  private remoteConfig: any;

  async initializeRemoteConfig(): Promise<void> {
    // Uncomment when Firebase is configured
    /*
    import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

    this.remoteConfig = getRemoteConfig();
    this.remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

    this.remoteConfig.defaultConfig = {
      enable_categories: true,
      enable_notifications: false,
      enable_dark_mode: true
    };

    await fetchAndActivate(this.remoteConfig);
    */
  }

  async getFeatureFlag(key: string): Promise<boolean> {
    // Uncomment when Firebase is configured
    /*
    import { getValue } from 'firebase/remote-config';

    if (!this.remoteConfig) {
      await this.initializeRemoteConfig();
    }

    const value = getValue(this.remoteConfig, key);
    return value.asBoolean();
    */

    // Fallback for development
    const defaults: Record<string, boolean> = {
      enable_categories: true,
      enable_notifications: false,
      enable_dark_mode: true
    };

    return defaults[key] ?? false;
  }
}
