import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from 'database/prisma.service';
import { UserRepository } from 'users/repositories/user-repository';
import { UserRepositoryPrisma } from 'users/repositories/prisma/user-repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'auth/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '864000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
