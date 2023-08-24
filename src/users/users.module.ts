import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user-repository';
import { UserRepositoryPrisma } from './repositories/prisma/user-repository';
import { PrismaService } from 'database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
  ],
})
export class UsersModule {}
