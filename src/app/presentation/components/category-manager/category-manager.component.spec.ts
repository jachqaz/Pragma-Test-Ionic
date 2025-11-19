import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CategoryManagerComponent} from './category-manager.component';
import {CategoryService} from '../../../data/services/category.service';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {signal} from '@angular/core';
import {of} from 'rxjs';

describe('CategoryManagerComponent', () => {
  let component: CategoryManagerComponent;
  let fixture: ComponentFixture<CategoryManagerComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let alertCtrlSpy: jasmine.SpyObj<AlertController>;
  let toastCtrlSpy: jasmine.SpyObj<ToastController>;

  beforeEach(async () => {
    const categorySpy = jasmine.createSpyObj('CategoryService', [
      'addCategory', 'updateCategory', 'deleteCategory', 'canDeleteCategory', 'deleteCategoryWithOrphans'
    ], {
      categories: signal([{id: '1', name: 'Default', color: '#666'}])
    });
    const modalSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);

    await TestBed.configureTestingModule({
      imports: [CategoryManagerComponent],
      providers: [
        {provide: CategoryService, useValue: categorySpy},
        {provide: ModalController, useValue: modalSpy},
        {provide: AlertController, useValue: alertSpy},
        {provide: ToastController, useValue: toastSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryManagerComponent);
    component = fixture.componentInstance;
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    modalCtrlSpy = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
    alertCtrlSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    toastCtrlSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;

    categoryServiceSpy.addCategory.and.returnValue(of(undefined));
    categoryServiceSpy.updateCategory.and.returnValue(of(undefined));
    categoryServiceSpy.deleteCategory.and.returnValue(of(undefined));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add category when form is valid', () => {
    component.categoryForm.patchValue({name: 'Work', color: '#3880ff'});

    component.addCategory();

    expect(categoryServiceSpy.addCategory).toHaveBeenCalledWith('Work', '#3880ff');
  });

  it('should not add category when form is invalid', () => {
    component.categoryForm.patchValue({name: '', color: ''});

    component.addCategory();

    expect(categoryServiceSpy.addCategory).not.toHaveBeenCalled();
  });

  it('should edit category name', () => {
    spyOn(window, 'prompt').and.returnValue('New Name');
    const category = {id: '1', name: 'Old Name', color: '#666'};

    component.editCategory(category);

    expect(categoryServiceSpy.updateCategory).toHaveBeenCalledWith('1', {name: 'New Name'});
  });

  it('should dismiss modal', () => {
    component.dismiss();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
