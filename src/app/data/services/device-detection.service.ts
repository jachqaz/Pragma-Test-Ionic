import {Platform} from '@ionic/angular';
import {inject, Injectable} from '@angular/core';

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'web';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectionService {
  private platform = inject(Platform);

  getDeviceType(): DeviceType {
    // Detectar si es móvil/tablet
    if (this.platform.is('mobile')) {
      return 'mobile';
    }

    // Detectar si es desktop o PWA
    if (this.platform.is('desktop') || this.platform.is('pwa')) {
      return 'desktop';
    }

    // Por defecto web
    return 'web';
  }

  isMobile(): boolean {
    return this.getDeviceType() === 'mobile';
  }

  isDesktop(): boolean {
    return this.getDeviceType() === 'desktop';
  }

  isWeb(): boolean {
    return this.getDeviceType() === 'web';
  }

  getScreenSize(): { width: number; height: number } {
    return {
      width: this.platform.width(),
      height: this.platform.height()
    };
  }
}
