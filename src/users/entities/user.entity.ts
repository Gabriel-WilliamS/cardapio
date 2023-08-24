import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}

  static async create(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return new User(randomUUID(), name, email, hash);
  }
}
