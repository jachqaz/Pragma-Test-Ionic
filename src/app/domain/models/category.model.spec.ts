import {Category} from './category.model';

describe('Category Model', () => {
  it('should create a category with all properties', () => {
    const category: Category = {
      id: '1',
      name: 'Work',
      color: '#3880ff'
    };

    expect(category.id).toBe('1');
    expect(category.name).toBe('Work');
    expect(category.color).toBe('#3880ff');
  });

  it('should allow different colors', () => {
    const category: Category = {
      id: '2',
      name: 'Personal',
      color: '#10dc60'
    };

    expect(category.color).toBe('#10dc60');
  });
});
