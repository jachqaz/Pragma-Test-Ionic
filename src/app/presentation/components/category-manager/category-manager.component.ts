import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {CategoryService} from '../../../data/services/category.service';
import {Category} from '../../../domain/models/category.model';

@Component({
  selector: 'app-category-manager',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Manage Categories</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Done</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Add Category Form -->
      <form [formGroup]="categoryForm" (ngSubmit)="addCategory()" class="add-form">
        <ion-item>
          <ion-input
            formControlName="name"
            placeholder="Category name"
            [clearInput]="true">
          </ion-input>
        </ion-item>

        <ion-item>
          <ion-select formControlName="color" placeholder="Select color">
            @for (color of colors; track color.value) {
              <ion-select-option [value]="color.value">
                <div class="color-option">
                  <div class="color-circle" [style.background-color]="color.value"></div>
                  {{ color.name }}
                </div>
              </ion-select-option>
            }
          </ion-select>
        </ion-item>

        <ion-button
          expand="block"
          type="submit"
          [disabled]="categoryForm.invalid"
          class="ion-margin">
          Add Category
        </ion-button>
      </form>

      <!-- Categories List -->
      <div class="categories-section">
        <h3>Categories</h3>
        @for (category of categoryService.categories(); track category.id) {
          <ion-item-sliding>
            <ion-item>
              <div class="category-color" [style.background-color]="category.color" slot="start"></div>
              <ion-label>{{ category.name }}</ion-label>
            </ion-item>

            <ion-item-options side="end">
              <ion-item-option color="primary" (click)="editCategory(category)">
                <ion-icon name="create" slot="icon-only"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" (click)="deleteCategory(category.id)">
                <ion-icon name="trash" slot="icon-only"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        }
      </div>
    </ion-content>
  `,
  styles: [`
    .add-form {
      padding: 16px;
      border-bottom: 1px solid var(--ion-color-light-shade);
    }

    .categories-section {
      padding: 16px;

      h3 {
        margin: 0 0 16px 0;
        color: var(--ion-color-dark);
      }
    }

    .category-color {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .color-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  `],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class CategoryManagerComponent {
  categoryService = inject(CategoryService);
  colors = [
    {name: 'Blue', value: '#3880ff'},
    {name: 'Green', value: '#10dc60'},
    {name: 'Yellow', value: '#ffce00'},
    {name: 'Red', value: '#f04141'},
    {name: 'Purple', value: '#8b5cf6'},
    {name: 'Orange', value: '#ff6b35'}
  ];
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    color: ['', Validators.required]
  });

  addCategory() {
    if (this.categoryForm.valid) {
      const {name, color} = this.categoryForm.value;
      this.categoryService.addCategory(name!, color!).subscribe(() => {
        this.categoryForm.reset();
      });
    }
  }

  editCategory(category: Category) {
    // Simple inline edit - could be enhanced with a separate modal
    const newName = prompt('Edit category name:', category.name);
    if (newName && newName !== category.name) {
      this.categoryService.updateCategory(category.id, {name: newName}).subscribe();
    }
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
