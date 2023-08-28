import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repositories/category-repository';
import { Category } from './entities/category.entity';
import {
  ICreateCategory,
  IDeleteCategory,
  IUpdateCategory,
} from './types/services.types';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  async create({ userId, name }: ICreateCategory) {
    const menu = await Category.create(name, userId);

    return await this.categoryRepository.create(menu);
  }

  async findAll(userId: string) {
    return await this.categoryRepository.findAll(userId);
  }

  async update({ id, name, userId }: IUpdateCategory) {
    const menuUpdated = {
      id,
      name,
      userId,
    };
    await this.categoryRepository.update(menuUpdated);
  }

  async remove({ id, userId }: IDeleteCategory) {
    const menuDeleted = {
      id,
      userId,
    };
    await this.categoryRepository.delete(menuDeleted);
  }
}
