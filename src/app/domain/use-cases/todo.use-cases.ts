import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {TodoEntity} from '../entities/todo.entity';
import {TodoRepository} from '../repositories/todo.repository';

@Injectable({providedIn: 'root'})
export class TodoUseCases {
  private todoRepository = inject(TodoRepository);

  getAllTodos(): Observable<TodoEntity[]> {
    return this.todoRepository.getAll();
  }

  getTodosByCategory(categoryId: string): Observable<TodoEntity[]> {
    return this.todoRepository.getByCategoryId(categoryId);
  }

  getCompletedTodos(): Observable<TodoEntity[]> {
    return this.todoRepository.getAll().pipe(
      map(todos => todos.filter(todo => todo.completed))
    );
  }

  getPendingTodos(): Observable<TodoEntity[]> {
    return this.todoRepository.getAll().pipe(
      map(todos => todos.filter(todo => !todo.completed))
    );
  }

  createTodo(todo: Omit<TodoEntity, 'id' | 'createdAt' | 'updatedAt'>): Observable<TodoEntity> {
    return this.todoRepository.create(todo);
  }

  updateTodo(id: string, todo: Partial<TodoEntity>): Observable<TodoEntity> {
    return this.todoRepository.update(id, {...todo, updatedAt: new Date()});
  }

  deleteTodo(id: string): Observable<void> {
    return this.todoRepository.delete(id);
  }

  toggleTodoComplete(id: string): Observable<TodoEntity> {
    return this.todoRepository.toggleComplete(id);
  }

  getTodosByPriority(priority: 'low' | 'medium' | 'high'): Observable<TodoEntity[]> {
    return this.todoRepository.getAll().pipe(
      map(todos => todos.filter(todo => todo.priority === priority))
    );
  }
}
