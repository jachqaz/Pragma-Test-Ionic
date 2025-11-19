import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category} from '../../domain/models/category.model';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private readonly STORAGE_KEY = 'pragma_categories';
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  categories = signal<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const categories = stored ? JSON.parse(stored) : this.getDefaultCategories();

    this.categories.set(categories);
    this.categoriesSubject.next(categories);
  }

  private saveCategories(categories: Category[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
    this.categories.set(categories);
    this.categoriesSubject.next(categories);
  }

  canDeleteCategory(id: string): { canDelete: boolean; taskCount: number; isDefault: boolean } {
    // Prevent deletion of default category
    if (id === 'default') {
      return {canDelete: false, taskCount: 0, isDefault: true};
    }

    // Inject TodoService to check for assigned tasks
    const todoService = (globalThis as any).todoServiceInstance;
    if (!todoService) {
      return {canDelete: true, taskCount: 0, isDefault: false};
    }

    const assignedTasks = todoService.getTasksByCategoryId(id);
    return {
      canDelete: assignedTasks.length === 0,
      taskCount: assignedTasks.length,
      isDefault: false
    };
  }

  addCategory(name: string, color: string): Observable<Category> {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color
    };

    const categories = [...this.categories(), newCategory];
    this.saveCategories(categories);
    return new BehaviorSubject(newCategory).asObservable();
  }

  deleteCategory(id: string): Observable<void> {
    const categories = this.categories().filter(cat => cat.id !== id);
    this.saveCategories(categories);
    return new BehaviorSubject(void 0).asObservable();
  }

  deleteCategoryWithOrphans(id: string): Observable<void> {
    // Unassign tasks first, then delete category
    const todoService = (globalThis as any).todoServiceInstance;
    if (todoService) {
      todoService.unassignTasksFromCategory(id).subscribe();
    }

    return this.deleteCategory(id);
  }

  private getDefaultCategories(): Category[] {
    return [
      {id: 'default', name: 'Default', color: '#666666'},
      {id: '1', name: 'Work', color: '#3880ff'},
      {id: '2', name: 'Personal', color: '#10dc60'},
      {id: '3', name: 'Shopping', color: '#ffce00'}
    ];
  }

  updateCategory(id: string, updates: Partial<Category>): Observable<Category> {
    const categories = this.categories().map(cat =>
      cat.id === id ? {...cat, ...updates} : cat
    );

    this.saveCategories(categories);
    const updatedCategory = categories.find(c => c.id === id)!;
    return new BehaviorSubject(updatedCategory).asObservable();
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories().find(cat => cat.id === id);
  }
}
