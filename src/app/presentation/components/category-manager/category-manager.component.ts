import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertController, IonicModule, ModalController, ToastController} from '@ionic/angular';
import {CategoryService} from '../../../data/services/category.service';
import {Category} from '../../../domain/models/category.model';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
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
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
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
    const newName = prompt('Edit category name:', category.name);
    if (newName && newName !== category.name) {
      this.categoryService.updateCategory(category.id, {name: newName}).subscribe();
    }
  }

  async deleteCategory(id: string) {
    const {canDelete, taskCount, isDefault} = this.categoryService.canDeleteCategory(id);

    if (isDefault) {
      const toast = await this.toastCtrl.create({
        message: 'Default category cannot be deleted',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
      return;
    }

    if (!canDelete) {
      const alert = await this.alertCtrl.create({
        header: 'Category in Use',
        message: `This category has ${taskCount} task(s) assigned. Tasks will be reassigned to "Default" category. Continue?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete & Reassign',
            role: 'destructive',
            handler: async () => {
              this.categoryService.deleteCategoryWithOrphans(id).subscribe();
              const toast = await this.toastCtrl.create({
                message: 'Category deleted and tasks reassigned',
                duration: 3000,
                position: 'bottom',
                color: 'warning'
              });
              await toast.present();
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Delete Category',
        message: 'Are you sure you want to delete this category?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: async () => {
              this.categoryService.deleteCategory(id).subscribe();
              const toast = await this.toastCtrl.create({
                message: 'Category deleted',
                duration: 2000,
                position: 'bottom',
                color: 'success'
              });
              await toast.present();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
