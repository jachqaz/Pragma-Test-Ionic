import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomePage} from './home.page';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';
import {TaskFilterService} from '../../../data/services/task-filter.service';
import {FirebaseRemoteConfigService} from '../../../data/services/firebase-remote-config.service';
import {AlertController, ModalController, Platform, ToastController} from '@ionic/angular';
import {signal} from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let taskFilterSpy: jasmine.SpyObj<TaskFilterService>;
  let remoteConfigSpy: jasmine.SpyObj<FirebaseRemoteConfigService>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let alertCtrlSpy: jasmine.SpyObj<AlertController>;
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(async () => {
    const todoSpy = jasmine.createSpyObj('TodoService', ['toggleTask', 'deleteTask']);
    const categorySpy = jasmine.createSpyObj('CategoryService', ['categories'], {
      categories: signal([{id: '1', name: 'Default', color: '#666'}])
    });
    const filterSpy = jasmine.createSpyObj('TaskFilterService', ['setSelectedCategory'], {
      filteredTasks: signal([]),
      selectedCategoryId: signal('all')
    });
    const configSpy = jasmine.createSpyObj('FirebaseRemoteConfigService', ['getFeatureFlagSync'], {
      getEnableAddTask: () => signal(true),
      getEnableManagementCategories: () => signal(true)
    });
    const modalSpy = jasmine.createSpyObj('ModalController', ['create']);
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
    const platformSpyObj = jasmine.createSpyObj('Platform', ['width'], {
      resize: {subscribe: jasmine.createSpy()}
    });

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        {provide: TodoService, useValue: todoSpy},
        {provide: CategoryService, useValue: categorySpy},
        {provide: TaskFilterService, useValue: filterSpy},
        {provide: FirebaseRemoteConfigService, useValue: configSpy},
        {provide: ModalController, useValue: modalSpy},
        {provide: AlertController, useValue: alertSpy},
        {provide: Platform, useValue: platformSpyObj},
        {provide: ToastController, useValue: jasmine.createSpyObj('ToastController', ['create'])}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    taskFilterSpy = TestBed.inject(TaskFilterService) as jasmine.SpyObj<TaskFilterService>;
    remoteConfigSpy = TestBed.inject(FirebaseRemoteConfigService) as jasmine.SpyObj<FirebaseRemoteConfigService>;
    modalCtrlSpy = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
    alertCtrlSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    platformSpy = TestBed.inject(Platform) as jasmine.SpyObj<Platform>;

    platformSpy.width.and.returnValue(1024);
    remoteConfigSpy.getFeatureFlagSync.and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with desktop layout for wide screens', () => {
    platformSpy.width.and.returnValue(1024);
    component.ngOnInit();
    expect(component.isDesktop()).toBe(true);
  });

  it('should change category filter', () => {
    component.onCategoryChange('cat1');
    expect(taskFilterSpy.setSelectedCategory).toHaveBeenCalledWith('cat1');
  });

  it('should open category manager modal', async () => {
    const modalSpy = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
    modalCtrlSpy.create.and.returnValue(Promise.resolve(modalSpy));

    await component.openCategoryManager();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
    expect(modalSpy.present).toHaveBeenCalled();
  });

  it('should get category name', () => {
    const name = component.getCategoryName('1');
    expect(name).toBe('Default');
  });

  it('should get category color', () => {
    const color = component.getCategoryColor('1');
    expect(color).toBe('#666');
  });
});
