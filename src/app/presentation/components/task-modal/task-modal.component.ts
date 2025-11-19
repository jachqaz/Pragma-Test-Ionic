import {Component, inject, Input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';
import {Task} from '../../../domain/models/task.model';

@Component({
  selector: 'app-task-modal',
  styles: [`
    .category-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    ion-chip {
      --color: white;
      cursor: pointer;
      opacity: 0.7;
      transition: var(--todo-transition);
    }

    ion-chip.selected {
      opacity: 1;
      transform: scale(1.05);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ task ? 'Edit Task' : 'Add Task' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cancel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-input
          [value]="title()"
          (ionInput)="title.set(($event.target.value || '') + '')"
          placeholder="Task title"
          [clearInput]="true">
        </ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Category</ion-label>
        <div class="category-chips">
          @for (category of categoryService.categories(); track category.id) {
            <ion-chip
              [class.selected]="selectedCategoryId() === category.id"
              (click)="selectedCategoryId.set(category.id)"
              [style.background-color]="category.color">
              {{ category.name }}
            </ion-chip>
          }
        </div>
      </ion-item>

      <ion-button
        expand="block"
        (click)="saveTask()"
        [disabled]="!title() || !selectedCategoryId()"
        class="ion-margin">
        {{ task ? 'Update' : 'Add' }} Task
      </ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TaskModalComponent {
  @Input() task?: Task;
  categoryService = inject(CategoryService);
  title = signal<string>('');
  selectedCategoryId = signal<string>('');
  private modalCtrl = inject(ModalController);
  private todoService = inject(TodoService);

  ngOnInit() {
    if (this.task) {
      this.title.set(this.task.title);
      this.selectedCategoryId.set(this.task.categoryId);
    }
  }

  saveTask() {
    if (!this.title() || !this.selectedCategoryId()) return;

    if (this.task) {
      this.todoService.updateTask(this.task.id, {
        title: this.title(),
        categoryId: this.selectedCategoryId()
      }).subscribe(() => this.dismiss());
    } else {
      this.todoService.addTask(this.title(), this.selectedCategoryId())
        .subscribe(() => this.dismiss());
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
