export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  categoryId: string;
  createdAt: Date;
}