import {Observable} from 'rxjs';
import {CategoryEntity} from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract create(category: Omit<CategoryEntity, 'id' | 'createdAt' | 'updatedAt'>): Observable<CategoryEntity>;

  abstract update(id: string, category: Partial<CategoryEntity>): Observable<CategoryEntity>;
}
