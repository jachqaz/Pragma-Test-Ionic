import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class RemoteConfigService {
  private featureFlags = signal<Record<string, boolean>>({
    enable_categories: true,
    enable_notifications: false,
    enable_dark_mode: true
  });

  async getFeatureFlag(key: string): Promise<boolean> {
    // Simulate Firebase Remote Config fetch
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.featureFlags()[key] ?? false;
  }

  async initializeRemoteConfig(): Promise<void> {
    // In real implementation, this would fetch from Firebase
    // For now, simulate with localStorage override
    const stored = localStorage.getItem('feature_flags');
    if (stored) {
      try {
        const flags = JSON.parse(stored);
        this.featureFlags.set({...this.featureFlags(), ...flags});
      } catch (e) {
        console.warn('Invalid feature flags in localStorage');
      }
    }
  }

  // For testing purposes - toggle feature flags
  toggleFeatureFlag(key: string): void {
    const current = this.featureFlags();
    const updated = {...current, [key]: !current[key]};
    this.featureFlags.set(updated);
    localStorage.setItem('feature_flags', JSON.stringify(updated));
  }

  getFeatureFlagSync(key: string): boolean {
    return this.featureFlags()[key] ?? false;
  }
}
