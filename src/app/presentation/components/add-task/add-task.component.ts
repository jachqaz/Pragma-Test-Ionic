import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';

@Component({
  selector: 'app-add-task',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Task</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cancel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-input
          [value]="title()"
          (ionInput)="title.set($event.target.value)"
          placeholder="Task title"
          [clearInput]="true">
        </ion-input>
      </ion-item>

      <ion-item>
        <ion-select
          [value]="selectedCategoryId()"
          (ionChange)="selectedCategoryId.set($event.detail.value)"
          placeholder="Select category">
          @for (category of categoryService.categories(); track category.id) {
            <ion-select-option [value]="category.id">
              {{ category.name }}
            </ion-select-option>
          }
        </ion-select>
      </ion-item>

      <ion-button
        expand="block"
        (click)="addTask()"
        [disabled]="!title || !selectedCategoryId"
        class="ion-margin">
        Add Task
      </ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AddTaskComponent {
  private modalCtrl = inject(ModalController);
  private todoService = inject(TodoService);
  categoryService = inject(CategoryService);

  title = signal<string>('');
  selectedCategoryId = signal<string>('');

  addTask() {
    if (this.title() && this.selectedCategoryId()) {
      this.todoService.addTask(this.title(), this.selectedCategoryId()).subscribe(() => {
        this.dismiss();
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
