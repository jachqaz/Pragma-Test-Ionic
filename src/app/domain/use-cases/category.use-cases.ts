import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryEntity} from '../entities/category.entity';
import {CategoryRepository} from '../repositories/category.repository';

@Injectable({providedIn: 'root'})
export class CategoryUseCases {
  private categoryRepository = inject(CategoryRepository);

  getAllCategories(): Observable<CategoryEntity[]> {
    return this.categoryRepository.getAll();
  }

  getCategoryById(id: string): Observable<CategoryEntity | null> {
    return this.categoryRepository.getById(id);
  }

  createCategory(category: Omit<CategoryEntity, 'id' | 'createdAt' | 'updatedAt'>): Observable<CategoryEntity> {
    return this.categoryRepository.create(category);
  }

  updateCategory(id: string, category: Partial<CategoryEntity>): Observable<CategoryEntity> {
    return this.categoryRepository.update(id, {...category, updatedAt: new Date()});
  }

  deleteCategory(id: string): Observable<void> {
    return this.categoryRepository.delete(id);
  }
}
