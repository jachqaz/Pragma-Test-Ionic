import {Observable} from 'rxjs';
import {TodoEntity} from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract create(todo: Omit<TodoEntity, 'id' | 'createdAt' | 'updatedAt'>): Observable<TodoEntity>;

  abstract update(id: string, todo: Partial<TodoEntity>): Observable<TodoEntity>;
}
