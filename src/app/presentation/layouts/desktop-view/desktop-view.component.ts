import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-desktop-view',
  templateUrl: './desktop-view.component.html',
  imports: [
    CommonModule,
    IonicModule
  ],
  standalone: true,
  styleUrls: ['./desktop-view.component.scss']
})
export class DesktopViewComponent {
  @Input() sharedData: any;
  @Output() buttonClick = new EventEmitter<void>();
  @Output() addItem = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<number>();

  onButtonClick() {
    this.buttonClick.emit();
  }

  onAddItem() {
    this.addItem.emit('Nuevo Item Desktop');
  }

  onRemoveItem(index: number) {
    this.removeItem.emit(index);
  }
}
