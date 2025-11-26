import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskModalComponent} from './task-modal.component';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';
import {ModalController} from '@ionic/angular';
import {signal} from '@angular/core';
import {of} from 'rxjs';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    const todoSpy = jasmine.createSpyObj('TodoService', ['addTask', 'updateTask']);
    const categorySpy = jasmine.createSpyObj('CategoryService', [], {
      categories: signal([{id: '1', name: 'Default', color: '#666'}])
    });
    const modalSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

    await TestBed.configureTestingModule({
      imports: [TaskModalComponent],
      providers: [
        {provide: TodoService, useValue: todoSpy},
        {provide: CategoryService, useValue: categorySpy},
        {provide: ModalController, useValue: modalSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    modalCtrlSpy = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;

    todoServiceSpy.addTask.and.returnValue(of(undefined));
    todoServiceSpy.updateTask.and.returnValue(of(undefined));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with task data when editing', () => {
    const task = {id: '1', title: 'Test Task', isCompleted: false, categoryId: 'cat1', createdAt: new Date()};
    component.task = task;
    component.ngOnInit();

    expect(component.title()).toBe('Test Task');
    expect(component.selectedCategoryId()).toBe('cat1');
  });

  it('should save new task', () => {
    component.title.set('New Task');
    component.selectedCategoryId.set('cat1');

    component.saveTask();

    expect(todoServiceSpy.addTask).toHaveBeenCalledWith('New Task', 'cat1');
  });

  it('should update existing task', () => {
    const task = {id: '1', title: 'Test Task', isCompleted: false, categoryId: 'cat1', createdAt: new Date()};
    component.task = task;
    component.title.set('Updated Task');
    component.selectedCategoryId.set('cat2');

    component.saveTask();

    expect(todoServiceSpy.updateTask).toHaveBeenCalledWith('1', {
      title: 'Updated Task',
      categoryId: 'cat2'
    });
  });

  it('should dismiss modal', () => {
    component.dismiss();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
