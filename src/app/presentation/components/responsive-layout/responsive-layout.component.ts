import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, Platform} from '@ionic/angular';

@Component({
  selector: 'app-responsive-layout',
  template: `
    <div [class]="layoutClass()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .mobile-layout {
      width: 100%;
      height: 100vh;
    }

    .tablet-layout {
      width: 100%;
      height: 100vh;
      max-width: 768px;
      margin: 0 auto;
    }

    .desktop-layout {
      width: 100%;
      height: 100vh;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
  `],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ResponsiveLayoutComponent {
  screenWidth = signal<number>(0);
  layoutClass = computed(() => {
    const width = this.screenWidth();
    if (width < 768) return 'mobile-layout';
    if (width < 1024) return 'tablet-layout';
    return 'desktop-layout';
  });
  private platform = inject(Platform);

  constructor() {
    this.updateScreenWidth();
    this.platform.resize.subscribe(() => {
      this.updateScreenWidth();
    });
  }

  private updateScreenWidth() {
    this.screenWidth.set(this.platform.width());
  }
}
