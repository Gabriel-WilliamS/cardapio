import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { MenuRepository } from '../menu-repository';
import { Menu } from 'menu/entities/menu.entity';

@Injectable()
export class MenuRepositoryPrisma implements MenuRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(menu: Menu): Promise<void> {
    try {
      await this.prisma.menu.create({
        data: {
          id: menu.id,
          name: menu.name,
          userId: menu.userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }

  async update(menu: Menu): Promise<void> {
    try {
      await this.prisma.menu.update({
        where: {
          id: menu.id,
          userId: menu.userId,
        },
        data: {
          name: menu.name,
        },
      });
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }

  async delete(menu: Omit<Menu, 'name'>): Promise<void> {
    try {
      await this.prisma.menu.delete({
        where: {
          id: menu.id,
          userId: menu.userId,
        },
      });
    } catch (error) {
      throw new NotFoundException({
        cause: new Error(error),
        description: 'Menu not found',
      });
    }
  }

  async findAll(userId: string): Promise<Menu[]> {
    try {
      const menus = await this.prisma.menu.findMany({
        where: {
          userId,
        },
      });

      return menus;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }
}
