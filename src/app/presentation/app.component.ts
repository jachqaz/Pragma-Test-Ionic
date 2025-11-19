import {Component, OnInit} from '@angular/core';
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  // private deviceService = inject(DeviceDetectionService);

  // currentLayout: DeviceType = 'mobile';

  // ngOnInit() {
  //   this.detectLayout();
  //
  //   // Escuchar cambios de tamaño (opcional)
  //   window.addEventListener('resize', () => {
  //     this.detectLayout();
  //   });
  // }
  //
  // detectLayout() {
  //   this.currentLayout = this.deviceService.getDeviceType();
  // }
  currentView: 'mobile' | 'tablet' | 'desktop' = 'mobile';
  screenWidth: number = 0;

  // Datos compartidos
  sharedData = {
    title: 'Mi Aplicación',
    user: {name: 'Usuario', email: 'user@example.com'},
    items: ['Item 1', 'Item 2', 'Item 3']
  };

  constructor(private platform: Platform) {
  }

  ngOnInit() {
    this.detectScreenSize();
    this.platform.resize.subscribe(() => {
      this.detectScreenSize();
    });
  }

  detectScreenSize() {
    this.screenWidth = this.platform.width();

    if (this.screenWidth < 768) {
      this.currentView = 'mobile';
    } else {
      this.currentView = 'desktop';
    }
  }

  // Métodos que se pasan a los componentes hijos
  handleButtonClick() {
    console.log('Botón clickeado desde:', this.currentView);
    // Puedes cambiar sharedData y se actualizará en los componentes
    this.sharedData.title = 'Título Actualizado';
  }

  addItem(newItem: string) {
    this.sharedData.items.push(newItem);
  }

  removeItem(index: number) {
    this.sharedData.items.splice(index, 1);
  }
}
