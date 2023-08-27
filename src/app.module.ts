import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from 'menu/menu.module';

@Module({
  imports: [UsersModule, MenuModule, AuthModule],
})
export class AppModule {}
