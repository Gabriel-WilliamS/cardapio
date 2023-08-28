import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CategoryRepository } from '../category-repository';
import { Category } from '../../entities/category.entity';
@Injectable()
export class CategoryRepositoryPrisma implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(category: Category): Promise<void> {
    try {
      await this.prisma.category.create({
        data: {
          id: category.id,
          name: category.name,
          userId: category.userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }

  async update(category: Category): Promise<void> {
    try {
      await this.prisma.category.update({
        where: {
          id: category.id,
          userId: category.userId,
        },
        data: {
          name: category.name,
        },
      });
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }

  async delete(category: Omit<Category, 'name'>): Promise<void> {
    try {
      await this.prisma.category.delete({
        where: {
          id: category.id,
          userId: category.userId,
        },
      });
    } catch (error) {
      throw new NotFoundException({
        cause: new Error(error),
        description: 'category not found',
      });
    }
  }

  async findAll(userId: string): Promise<Category[]> {
    try {
      const categorys = await this.prisma.category.findMany({
        where: {
          userId,
        },
      });

      return categorys;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }
}
