import {TestBed} from '@angular/core/testing';
import {CategoryService} from './category.service';
import {TodoService} from './todo.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TodoService', ['reassignTasksToCategory']);

    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        {provide: TodoService, useValue: spy}
      ]
    });

    service = TestBed.inject(CategoryService);
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default category', () => {
    const categories = service.categories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0].name).toBe('Default');
  });

  it('should add category', (done) => {
    service.addCategory('Work', '#3880ff').subscribe(() => {
      const categories = service.categories();
      const workCategory = categories.find(c => c.name === 'Work');
      expect(workCategory).toBeTruthy();
      expect(workCategory?.color).toBe('#3880ff');
      done();
    });
  });

  it('should update category', (done) => {
    service.addCategory('Work', '#3880ff').subscribe(() => {
      const categoryId = service.categories().find(c => c.name === 'Work')?.id!;

      service.updateCategory(categoryId, {name: 'Business'}).subscribe(() => {
        const category = service.categories().find(c => c.id === categoryId);
        expect(category?.name).toBe('Business');
        done();
      });
    });
  });

  it('should delete category', (done) => {
    service.addCategory('Work', '#3880ff').subscribe(() => {
      const categoryId = service.categories().find(c => c.name === 'Work')?.id!;

      service.deleteCategory(categoryId).subscribe(() => {
        const category = service.categories().find(c => c.id === categoryId);
        expect(category).toBeUndefined();
        done();
      });
    });
  });

  it('should get default category id', () => {
    const defaultId = service.getDefaultCategoryId();
    expect(defaultId).toBeTruthy();
  });
});
