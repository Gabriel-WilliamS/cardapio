import { randomUUID } from 'node:crypto';

export class Category {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly userId: string,
  ) {}

  static async create(name: string, userId: string): Promise<Category> {
    return new Category(randomUUID(), name, userId);
  }
}
