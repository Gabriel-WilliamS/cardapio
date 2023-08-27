import { Menu } from '../entities/menu.entity';

export interface ICreateMenu {
  userId: string;
  name: string;
}

export abstract class MenuRepository {
  abstract create(data: Menu): Promise<void>;
  abstract update(userId: string, menuId: string): Promise<void>;
  abstract delete(userId: string, menuId: string): Promise<void>;
  abstract find(userId: string, menuId: string): Promise<Menu>;
  abstract findAll(userId: string, menuId: string): Promise<Menu[]>;
}
