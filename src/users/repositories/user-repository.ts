import { UpdateUserDto } from 'users/dto/update-user.dto';
import { User } from '../entities/user.entity';
import { FindByEmailDto } from 'users/dto/find-by-email.dto';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract update(user: UpdateUserDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract find(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: FindByEmailDto): Promise<User>;
}
