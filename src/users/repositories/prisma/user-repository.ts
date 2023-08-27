import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { User } from 'users/entities/user.entity';
import { UserRepository } from '../user-repository';
import { UpdateUserDto } from 'users/dto/update-user.dto';
import { FindByEmailDto } from 'users/dto/find-by-email.dto';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }

  async find(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('User not found', {
        cause: new Error(error),
        description: 'User not found',
      });
    }
  }

  async update({ id, email, name, password }: UpdateUserDto): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<void> {
    console.log('id', id);
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException({
        cause: new Error(error),
        description: 'User not found',
      });
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findByEmail({ email }: FindByEmailDto): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
