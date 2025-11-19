import {Task} from './task.model';

describe('Task Model', () => {
  it('should create a task with all properties', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      isCompleted: false,
      categoryId: 'cat1',
      createdAt: new Date()
    };

    expect(task.id).toBe('1');
    expect(task.title).toBe('Test Task');
    expect(task.isCompleted).toBe(false);
    expect(task.categoryId).toBe('cat1');
    expect(task.createdAt).toBeInstanceOf(Date);
  });

  it('should allow completed task', () => {
    const task: Task = {
      id: '2',
      title: 'Completed Task',
      isCompleted: true,
      categoryId: 'cat2',
      createdAt: new Date()
    };

    expect(task.isCompleted).toBe(true);
  });
});
