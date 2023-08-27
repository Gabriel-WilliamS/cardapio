import { Module } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuRepository } from './repositories/menu-repository';
import { MenuRepositoryPrisma } from './repositories/prisma/menu-repository';

@Module({
  controllers: [MenuController],
  providers: [
    MenuService,
    PrismaService,
    {
      provide: MenuRepository,
      useClass: MenuRepositoryPrisma,
    },
  ],
})
export class MenuModule {}
