import { Injectable } from '@nestjs/common';
import { MenuRepository } from './repositories/menu-repository';
import { Menu } from './entities/menu.entity';
import { ICreateMenu, IDeleteMenu, IUpdateMenu } from './types/service.types';

@Injectable()
export class MenuService {
  constructor(private menuRepository: MenuRepository) {}
  async create({ userId, name }: ICreateMenu) {
    const menu = await Menu.create(name, userId);

    return await this.menuRepository.create(menu);
  }

  async findAll(userId: string) {
    return await this.menuRepository.findAll(userId);
  }

  async update({ id, name, userId }: IUpdateMenu) {
    const menuUpdated = {
      id,
      name,
      userId,
    };
    await this.menuRepository.update(menuUpdated);
  }

  async remove({ id, userId }: IDeleteMenu) {
    const menuDeleted = {
      id,
      userId,
    };
    await this.menuRepository.delete(menuDeleted);
  }
}
