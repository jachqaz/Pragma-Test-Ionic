import {Component, inject, Input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';
import {Task} from '../../../domain/models/task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
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
