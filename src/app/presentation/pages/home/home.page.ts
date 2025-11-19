import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertController, IonicModule, ModalController, Platform, ToastController} from '@ionic/angular';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';
import {TaskFilterService} from '../../../data/services/task-filter.service';
import {FirebaseRemoteConfigService} from '../../../data/services/firebase-remote-config.service';
import {TaskModalComponent} from '../../components/task-modal/task-modal.component';
import {CategoryManagerComponent} from '../../components/category-manager/category-manager.component';
import {Task} from '../../../domain/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HomePage implements OnInit {
  private platform = inject(Platform);
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private todoService = inject(TodoService);
  categoryService = inject(CategoryService);
  private taskFilter = inject(TaskFilterService);
  private remoteConfig = inject(FirebaseRemoteConfigService);

  screenWidth = signal<number>(0);
  categoriesEnabled = signal<boolean>(true);

  isDesktop = computed(() => this.screenWidth() >= 768);
  filteredTasks = this.taskFilter.filteredTasks;
  selectedCategoryId = this.taskFilter.selectedCategoryId;

  // Feature flags from Firebase Remote Config
  enableAddTask = this.remoteConfig.getEnableAddTask();
  enableManagementCategories = this.remoteConfig.getEnableManagementCategories();

  constructor() {
    this.updateScreenWidth();
    this.platform.resize.subscribe(() => {
      this.updateScreenWidth();
    });
  }

  ngOnInit() {
    const enabled = this.remoteConfig.getFeatureFlagSync('enableManagementCategories');
    this.categoriesEnabled.set(enabled);

    if (!enabled) {
      this.taskFilter.setSelectedCategory('all');
    }
  }

  private updateScreenWidth() {
    this.screenWidth.set(this.platform.width());
  }

  onCategoryChange(categoryId: string) {
    this.taskFilter.setSelectedCategory(categoryId);
  }

  async openCategoryManager() {
    const modal = await this.modalCtrl.create({
      component: CategoryManagerComponent
    });
    await modal.present();
  }

  async openTaskModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: {task}
    });
    await modal.present();
  }

  toggleTask(task: Task) {
    this.todoService.toggleTask(task.id).subscribe();
  }

  async deleteTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Task',
      message: `Are you sure you want to delete "${task.title}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            this.todoService.deleteTask(task.id).subscribe();
            const toast = await this.toastCtrl.create({
              message: 'Task deleted',
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

  getCategoryName(categoryId: string): string {
    const category = this.categoryService.categories().find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categoryService.categories().find(c => c.id === categoryId);
    return category?.color || '#666';
  }

  trackByTask(index: number, task: Task): string {
    return task.id;
  }
}
