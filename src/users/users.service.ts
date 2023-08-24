import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user-repository';
import { FindByEmailDto } from './dto/find-by-email-dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await User.create(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return await this.userRepository.create(user);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.find(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userData = {
      id,
      ...updateUserDto,
    };
    await this.userRepository.update(userData);
  }

  async findByEmail(email: FindByEmailDto) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }
}
