import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  imports: [
    CommonModule,
    IonicModule
  ],
  standalone: true,
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent {
  @Input() sharedData: any;
  @Output() buttonClick = new EventEmitter<void>();
  @Output() addItem = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<number>();

  onButtonClick() {
    this.buttonClick.emit();
  }

  onAddItem() {
    this.addItem.emit('Nuevo Item Mobile');
  }

  onRemoveItem(index: number) {
    this.removeItem.emit(index);
  }
}
