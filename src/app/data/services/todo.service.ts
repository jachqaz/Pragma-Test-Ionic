import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../../domain/models/task.model';

@Injectable({providedIn: 'root'})
export class TodoService {
  tasks = signal<Task[]>([]);
  private readonly STORAGE_KEY = 'pragma_todos';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
    // Make instance globally available for category service
    (globalThis as any).todoServiceInstance = this;
  }

  addTask(title: string, categoryId: string): Observable<Task> {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      isCompleted: false,
      categoryId,
      createdAt: new Date()
    };

    const tasks = [...this.tasks(), newTask];
    this.saveTasks(tasks);
    return new BehaviorSubject(newTask).asObservable();
  }

  updateTask(id: string, updates: Partial<Task>): Observable<Task> {
    const tasks = this.tasks().map(task =>
      task.id === id ? {...task, ...updates} : task
    );

    this.saveTasks(tasks);
    const updatedTask = tasks.find(t => t.id === id)!;
    return new BehaviorSubject(updatedTask).asObservable();
  }

  deleteTask(id: string): Observable<void> {
    const tasks = this.tasks().filter(task => task.id !== id);
    this.saveTasks(tasks);
    return new BehaviorSubject(void 0).asObservable();
  }

  getTasksByCategoryId(categoryId: string): Task[] {
    return this.tasks().filter(task => task.categoryId === categoryId);
  }

  unassignTasksFromCategory(categoryId: string): Observable<void> {
    const tasks = this.tasks().map(task =>
      task.categoryId === categoryId
        ? {...task, categoryId: 'default'}
        : task
    );
    this.saveTasks(tasks);
    return new BehaviorSubject(void 0).asObservable();
  }

  toggleTask(id: string): Observable<Task> {
    return this.updateTask(id, {
      isCompleted: !this.tasks().find(t => t.id === id)?.isCompleted
    });
  }

  private loadTasks(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const tasks = stored ? JSON.parse(stored).map((t: any) => ({
      ...t,
      createdAt: new Date(t.createdAt)
    })) : this.getDefaultTasks();

    this.tasks.set(tasks);
    this.tasksSubject.next(tasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this.tasks.set(tasks);
    this.tasksSubject.next(tasks);
  }

  private getDefaultTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'Complete project setup',
        isCompleted: true,
        categoryId: '1',
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'Implement todo functionality',
        isCompleted: false,
        categoryId: '1',
        createdAt: new Date()
      },
      {
        id: '3',
        title: 'Buy groceries',
        isCompleted: false,
        categoryId: '2',
        createdAt: new Date()
      }
    ];
  }
}
