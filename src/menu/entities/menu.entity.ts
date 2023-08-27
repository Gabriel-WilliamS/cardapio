import { randomUUID } from 'node:crypto';

export class Menu {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly userId: string,
  ) {}

  static async create(name: string, userId: string): Promise<Menu> {
    return new Menu(randomUUID(), name, userId);
  }
}
