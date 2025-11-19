import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategoryEntity} from '../../domain/entities/category.entity';
import {CategoryRepository} from '../../domain/repositories/category.repository';

@Injectable({providedIn: 'root'})
export class CategoryRepositoryImpl extends CategoryRepository {
  private categories$ = new BehaviorSubject<CategoryEntity[]>([]);
  private nextId = 1;

  constructor() {
    super();
    this.initializeDefaultCategories();
  }

  private initializeDefaultCategories(): void {
    const defaultCategories: CategoryEntity[] = [
      {
        id: '1',
        name: 'Work',
        color: '#3880ff',
        icon: 'briefcase',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        name: 'Personal',
        color: '#10dc60',
        icon: 'person',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '3',
        name: 'Shopping',
        color: '#ffce00',
        icon: 'bag',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];
    this.categories$.next(defaultCategories);
    this.nextId = 4;
  }

  getAll(): Observable<CategoryEntity[]> {
    return this.categories$.asObservable();
  }

  getById(id: string): Observable<CategoryEntity | null> {
    return this.categories$.pipe(
      map(categories => categories.find(category => category.id === id) || null)
    );
  }

  create(categoryData: Omit<CategoryEntity, 'id' | 'createdAt' | 'updatedAt'>): Observable<CategoryEntity> {
    const newCategory: CategoryEntity = {
      ...categoryData,
      id: this.nextId.toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentCategories = this.categories$.value;
    this.categories$.next([...currentCategories, newCategory]);
    this.nextId++;

    return of(newCategory);
  }

  update(id: string, categoryData: Partial<CategoryEntity>): Observable<CategoryEntity> {
    const currentCategories = this.categories$.value;
    const categoryIndex = currentCategories.findIndex(category => category.id === id);

    if (categoryIndex === -1) {
      throw new Error(`Category with id ${id} not found`);
    }

    const updatedCategory = {
      ...currentCategories[categoryIndex],
      ...categoryData,
      updatedAt: new Date()
    };

    const updatedCategories = [...currentCategories];
    updatedCategories[categoryIndex] = updatedCategory;
    this.categories$.next(updatedCategories);

    return of(updatedCategory);
  }

  delete(id: string): Observable<void> {
    const currentCategories = this.categories$.value;
    const filteredCategories = currentCategories.filter(category => category.id !== id);
    this.categories$.next(filteredCategories);
    return of(void 0);
  }
}
