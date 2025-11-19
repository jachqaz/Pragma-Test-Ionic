export interface TodoEntity {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  categoryId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}