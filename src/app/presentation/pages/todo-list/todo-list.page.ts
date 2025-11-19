import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {Task} from '../../../domain/models/task.model';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';
import {AddTaskComponent} from '../../components/add-task/add-task.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TodoListPage implements OnInit {
  selectedCategoryId = signal<string>('all');
  searchTerm = signal<string>('');
  showCompleted = signal<boolean>(true);
  private todoService = inject(TodoService);
  filteredTodos = computed(() => {
    let filtered = this.todoService.tasks();

    if (this.selectedCategoryId() !== 'all') {
      filtered = filtered.filter(task => task.categoryId === this.selectedCategoryId());
    }

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(term)
      );
    }

    if (!this.showCompleted()) {
      filtered = filtered.filter(task => !task.isCompleted);
    }

    return filtered.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });
  private categoryService = inject(CategoryService);
  private modalCtrl = inject(ModalController);

  ngOnInit() {
    // Services automatically load data via signals
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategoryId.set(categoryId);
  }

  onSearchChange(event: any) {
    this.searchTerm.set(event.target.value);
  }

  toggleShowCompleted() {
    this.showCompleted.update(show => !show);
  }

  toggleTodoComplete(task: Task) {
    this.todoService.toggleTask(task.id).subscribe();
  }

  deleteTodo(task: Task) {
    this.todoService.deleteTask(task.id).subscribe();
  }

  getCategoryName(categoryId: string): string {
    const category = this.categoryService.categories().find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categoryService.categories().find(c => c.id === categoryId);
    return category?.color || '#666';
  }

  trackByTodo(index: number, task: Task): string {
    return task.id;
  }

  async openAddTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskComponent
    });
    await modal.present();
  }
}
