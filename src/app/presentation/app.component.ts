import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {IonicModule, Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, IonicModule]
})
export class AppComponent implements OnInit {
  private platform = inject(Platform);

  currentView = signal<'mobile' | 'tablet' | 'desktop'>('mobile');
  screenWidth = signal<number>(0);

  ngOnInit() {
    this.initializePlatform();
    this.detectScreenSize();
    this.platform.resize.subscribe(() => {
      this.detectScreenSize();
    });
  }

  private initializePlatform() {
    this.platform.ready().then(() => {
      // Platform is ready - Cordova plugins are available
      if (this.platform.is('cordova')) {
        console.log('Running on Cordova platform');
        // Initialize Cordova-specific functionality here
      }
    });
  }

  private detectScreenSize() {
    const width = this.platform.width();
    this.screenWidth.set(width);

    if (width < 768) {
      this.currentView.set('mobile');
    } else if (width < 1024) {
      this.currentView.set('tablet');
    } else {
      this.currentView.set('desktop');
    }
  }
}
