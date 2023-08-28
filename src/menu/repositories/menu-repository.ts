import { Menu } from '../entities/menu.entity';

export abstract class MenuRepository {
  abstract create(menu: Menu): Promise<void>;
  abstract update(menu: Menu): Promise<void>;
  abstract delete(menu: Omit<Menu, 'name'>): Promise<void>;
  abstract findAll(userId: string): Promise<Menu[]>;
}
