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

  private getDefaultCategories(): Category[] {
    return [
      {id: '1', name: 'Work', color: '#3880ff'},
      {id: '2', name: 'Personal', color: '#10dc60'},
      {id: '3', name: 'Shopping', color: '#ffce00'}
    ];
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

  updateCategory(id: string, updates: Partial<Category>): Observable<Category> {
    const categories = this.categories().map(cat =>
      cat.id === id ? {...cat, ...updates} : cat
    );

    this.saveCategories(categories);
    const updatedCategory = categories.find(c => c.id === id)!;
    return new BehaviorSubject(updatedCategory).asObservable();
  }
}
