import {computed, inject, Injectable, signal} from '@angular/core';
import {TodoService} from './todo.service';

@Injectable({providedIn: 'root'})
export class TaskFilterService {
  selectedCategoryId = signal<string>('all');
  private todoService = inject(TodoService);
  filteredTasks = computed(() => {
    const tasks = this.todoService.tasks();
    const categoryId = this.selectedCategoryId();

    if (categoryId === 'all') return tasks;
    return tasks.filter(task => task.categoryId === categoryId);
  });

  setSelectedCategory(categoryId: string): void {
    this.selectedCategoryId.set(categoryId);
  }
}
