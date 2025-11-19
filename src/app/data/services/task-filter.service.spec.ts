import {TestBed} from '@angular/core/testing';
import {TaskFilterService} from './task-filter.service';
import {TodoService} from './todo.service';
import {signal} from '@angular/core';

describe('TaskFilterService', () => {
  let service: TaskFilterService;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    const mockTasks = signal([
      {id: '1', title: 'Task 1', isCompleted: false, categoryId: 'cat1', createdAt: new Date()},
      {id: '2', title: 'Task 2', isCompleted: true, categoryId: 'cat2', createdAt: new Date()}
    ]);

    const spy = jasmine.createSpyObj('TodoService', [], {tasks: mockTasks});

    TestBed.configureTestingModule({
      providers: [
        TaskFilterService,
        {provide: TodoService, useValue: spy}
      ]
    });

    service = TestBed.inject(TaskFilterService);
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter tasks by category', () => {
    service.setSelectedCategory('cat1');
    const filtered = service.filteredTasks();
    expect(filtered.length).toBe(1);
    expect(filtered[0].categoryId).toBe('cat1');
  });

  it('should show all tasks when category is "all"', () => {
    service.setSelectedCategory('all');
    const filtered = service.filteredTasks();
    expect(filtered.length).toBe(2);
  });

  it('should update selected category signal', () => {
    service.setSelectedCategory('cat2');
    expect(service.selectedCategoryId()).toBe('cat2');
  });
});
