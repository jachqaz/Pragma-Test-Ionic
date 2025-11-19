import {TestBed} from '@angular/core/testing';
import {TodoService} from './todo.service';
import {CategoryService} from './category.service';

describe('TodoService', () => {
  let service: TodoService;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CategoryService', ['getDefaultCategoryId']);

    TestBed.configureTestingModule({
      providers: [
        TodoService,
        {provide: CategoryService, useValue: spy}
      ]
    });

    service = TestBed.inject(TodoService);
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    categoryServiceSpy.getDefaultCategoryId.and.returnValue('default');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add task and update signal', (done) => {
    service.addTask('Test Task', 'cat1').subscribe(() => {
      const tasks = service.tasks();
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Test Task');
      expect(tasks[0].categoryId).toBe('cat1');
      done();
    });
  });

  it('should toggle task completion', (done) => {
    service.addTask('Test Task', 'cat1').subscribe(() => {
      const taskId = service.tasks()[0].id;

      service.toggleTask(taskId).subscribe(() => {
        const task = service.tasks().find(t => t.id === taskId);
        expect(task?.isCompleted).toBe(true);
        done();
      });
    });
  });

  it('should delete task', (done) => {
    service.addTask('Test Task', 'cat1').subscribe(() => {
      const taskId = service.tasks()[0].id;

      service.deleteTask(taskId).subscribe(() => {
        expect(service.tasks().length).toBe(0);
        done();
      });
    });
  });

  it('should update task', (done) => {
    service.addTask('Test Task', 'cat1').subscribe(() => {
      const taskId = service.tasks()[0].id;

      service.updateTask(taskId, {title: 'Updated Task'}).subscribe(() => {
        const task = service.tasks().find(t => t.id === taskId);
        expect(task?.title).toBe('Updated Task');
        done();
      });
    });
  });
});
