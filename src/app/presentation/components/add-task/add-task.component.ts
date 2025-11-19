import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
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
