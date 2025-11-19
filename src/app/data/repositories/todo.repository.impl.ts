import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {TodoEntity} from '../../domain/entities/todo.entity';
import {TodoRepository} from '../../domain/repositories/todo.repository';

@Injectable({providedIn: 'root'})
export class TodoRepositoryImpl extends TodoRepository {
  private todos$ = new BehaviorSubject<TodoEntity[]>([]);
  private nextId = 1;

  constructor() {
    super();
    this.initializeDefaultTodos();
  }

  getAll(): Observable<TodoEntity[]> {
    return this.todos$.asObservable();
  }

  getById(id: string): Observable<TodoEntity | null> {
    return this.todos$.pipe(
      map(todos => todos.find(todo => todo.id === id) || null)
    );
  }

  getByCategoryId(categoryId: string): Observable<TodoEntity[]> {
    return this.todos$.pipe(
      map(todos => todos.filter(todo => todo.categoryId === categoryId))
    );
  }

  create(todoData: Omit<TodoEntity, 'id' | 'createdAt' | 'updatedAt'>): Observable<TodoEntity> {
    const newTodo: TodoEntity = {
      ...todoData,
      id: this.nextId.toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentTodos = this.todos$.value;
    this.todos$.next([...currentTodos, newTodo]);
    this.nextId++;

    return of(newTodo);
  }

  update(id: string, todoData: Partial<TodoEntity>): Observable<TodoEntity> {
    const currentTodos = this.todos$.value;
    const todoIndex = currentTodos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updatedTodo = {
      ...currentTodos[todoIndex],
      ...todoData,
      updatedAt: new Date()
    };

    const updatedTodos = [...currentTodos];
    updatedTodos[todoIndex] = updatedTodo;
    this.todos$.next(updatedTodos);

    return of(updatedTodo);
  }

  delete(id: string): Observable<void> {
    const currentTodos = this.todos$.value;
    const filteredTodos = currentTodos.filter(todo => todo.id !== id);
    this.todos$.next(filteredTodos);
    return of(void 0);
  }

  toggleComplete(id: string): Observable<TodoEntity> {
    const currentTodos = this.todos$.value;
    const todoIndex = currentTodos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updatedTodo = {
      ...currentTodos[todoIndex],
      completed: !currentTodos[todoIndex].completed,
      updatedAt: new Date()
    };

    const updatedTodos = [...currentTodos];
    updatedTodos[todoIndex] = updatedTodo;
    this.todos$.next(updatedTodos);

    return of(updatedTodo);
  }

  private initializeDefaultTodos(): void {
    const defaultTodos: TodoEntity[] = [
      {
        id: '1',
        title: 'Complete project setup',
        description: 'Set up the Ionic Angular project with Clean Architecture',
        completed: true,
        categoryId: '1',
        priority: 'high',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        title: 'Implement Todo functionality',
        description: 'Create CRUD operations for todos',
        completed: false,
        categoryId: '1',
        priority: 'medium',
        dueDate: new Date('2024-12-31'),
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
      },
      {
        id: '3',
        title: 'Buy groceries',
        description: 'Milk, bread, eggs, fruits',
        completed: false,
        categoryId: '2',
        priority: 'low',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03')
      }
    ];
    this.todos$.next(defaultTodos);
    this.nextId = 4;
  }
}
