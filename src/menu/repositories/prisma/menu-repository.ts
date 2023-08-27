import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { MenuRepository } from '../menu-repository';
import { Menu } from 'menu/entities/menu.entity';

@Injectable()
export class MenuRepositoryPrisma implements MenuRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Menu): Promise<void> {
    try {
      await this.prisma.menu.create({
        data: {
          id: data.id,
          name: data.name,
          userId: data.userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }

  update(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(): Promise<Menu> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Menu[]> {
    throw new Error('Method not implemented.');
  }
}
