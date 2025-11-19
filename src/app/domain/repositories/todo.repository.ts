import {Observable} from 'rxjs';
import {TodoEntity} from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract getAll(): Observable<TodoEntity[]>;

  abstract getById(id: string): Observable<TodoEntity | null>;

  abstract getByCategoryId(categoryId: string): Observable<TodoEntity[]>;

  abstract create(todo: Omit<TodoEntity, 'id' | 'createdAt' | 'updatedAt'>): Observable<TodoEntity>;

  abstract update(id: string, todo: Partial<TodoEntity>): Observable<TodoEntity>;

  abstract delete(id: string): Observable<void>;

  abstract toggleComplete(id: string): Observable<TodoEntity>;
}
