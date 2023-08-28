import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'database/prisma.service';
import { CategoryRepository } from './repositories/category-repository';
import { CategoryRepositoryPrisma } from './repositories/prisma/category-repository';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryPrisma,
    },
  ],
})
export class CategoryModule {}
