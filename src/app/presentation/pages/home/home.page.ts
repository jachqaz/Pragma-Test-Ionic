import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, ModalController, Platform} from '@ionic/angular';
import {TodoService} from '../../../data/services/todo.service';
import {CategoryService} from '../../../data/services/category.service';
import {RemoteConfigService} from '../../../data/services/remote-config.service';
import {TaskModalComponent} from '../../components/task-modal/task-modal.component';
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
  private todoService = inject(TodoService);
  categoryService = inject(CategoryService);
  private remoteConfig = inject(RemoteConfigService);

  screenWidth = signal<number>(0);
  selectedCategoryId = signal<string>('all');
  categoriesEnabled = signal<boolean>(true);

  isDesktop = computed(() => this.screenWidth() >= 768);

  filteredTasks = computed(() => {
    const tasks = this.todoService.tasks();
    const categoryId = this.selectedCategoryId();
    const categoriesEnabled = this.categoriesEnabled();

    if (!categoriesEnabled || categoryId === 'all') return tasks;
    return tasks.filter(task => task.categoryId === categoryId);
  });

  constructor() {
    this.updateScreenWidth();
    this.platform.resize.subscribe(() => {
      this.updateScreenWidth();
    });
  }

  async ngOnInit() {
    await this.remoteConfig.initializeRemoteConfig();
    const enabled = await this.remoteConfig.getFeatureFlag('enable_categories');
    this.categoriesEnabled.set(enabled);

    if (!enabled) {
      this.selectedCategoryId.set('all');
    }
  }

  private updateScreenWidth() {
    this.screenWidth.set(this.platform.width());
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategoryId.set(categoryId);
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

  deleteTask(task: Task) {
    this.todoService.deleteTask(task.id).subscribe();
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
