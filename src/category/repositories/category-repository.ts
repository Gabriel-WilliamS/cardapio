import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>;
  abstract update(category: Category): Promise<void>;
  abstract delete(category: Omit<Category, 'name'>): Promise<void>;
  abstract findAll(userId: string): Promise<Category[]>;
}
