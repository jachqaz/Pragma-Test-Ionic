import {Injectable, signal} from '@angular/core';
import {RemoteConfigRepository} from '../../domain/repositories/remote-config.repository';

@Injectable({providedIn: 'root'})
export class FirebaseRemoteConfigService extends RemoteConfigRepository {
  private featureFlags = signal<Record<string, boolean>>({
    enableAddTask: true,
    enableManagementCategories: true,
    enableDarkMode: false
  });

  // Reactive signals for UI binding
  get enableAddTask() {
    return () => this.featureFlags()['enableAddTask'];
  }

  get enableManagementCategories() {
    return () => this.featureFlags()['enableManagementCategories'];
  }

  get enableDarkMode() {
    return () => this.featureFlags()['enableDarkMode'];
  }

  async initializeRemoteConfig(): Promise<void> {
    // Real Firebase implementation (commented for development)
    /*
    import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

    remoteConfig.defaultConfig = {
      enableAddTask: true,
      enableManagementCategories: true,
      enableDarkMode: false
    };

    await fetchAndActivate(remoteConfig);

    // Update signals with fetched values
    this.featureFlags.set({
      enableAddTask: getValue(remoteConfig, 'enableAddTask').asBoolean(),
      enableManagementCategories: getValue(remoteConfig, 'enableManagementCategories').asBoolean(),
      enableDarkMode: getValue(remoteConfig, 'enableDarkMode').asBoolean()
    });
    */

    // Development fallback with localStorage override
    const stored = localStorage.getItem('firebase_feature_flags');
    if (stored) {
      try {
        const flags = JSON.parse(stored);
        this.featureFlags.update(current => ({...current, ...flags}));
      } catch (e) {
        console.warn('Invalid feature flags in localStorage');
      }
    }

    // Apply dark mode immediately
    this.applyDarkMode();
  }

  async getFeatureFlag(key: string): Promise<boolean> {
    return this.featureFlags()[key] ?? false;
  }

  getFeatureFlagSync(key: string): boolean {
    return this.featureFlags()[key] ?? false;
  }

  // For testing - toggle flags
  toggleFeatureFlag(key: string): void {
    const current = this.featureFlags();
    const updated = {...current, [key]: !current[key]};
    this.featureFlags.set(updated);
    localStorage.setItem('firebase_feature_flags', JSON.stringify(updated));

    if (key === 'enableDarkMode') {
      this.applyDarkMode();
    }
  }

  private applyDarkMode(): void {
    const isDarkMode = this.featureFlags()['enableDarkMode'];
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
