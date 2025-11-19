import {Injectable, signal} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface AppConfig {
  maxTodosPerCategory: number;
  enableNotifications: boolean;
  defaultPriority: 'low' | 'medium' | 'high';
  theme: 'light' | 'dark' | 'auto';
  virtualScrollItemHeight: number;
}

@Injectable({providedIn: 'root'})
export class FirebaseConfigService {
  private config = signal<AppConfig>({
    maxTodosPerCategory: 50,
    enableNotifications: true,
    defaultPriority: 'medium',
    theme: 'auto',
    virtualScrollItemHeight: 80
  });

  getConfig(): Observable<AppConfig> {
    // In a real implementation, this would fetch from Firebase Remote Config
    return of(this.config());
  }

  updateConfig(newConfig: Partial<AppConfig>): void {
    this.config.update(current => ({...current, ...newConfig}));
  }

  get currentConfig() {
    return this.config.asReadonly();
  }
}
