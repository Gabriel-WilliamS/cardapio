import { Injectable } from '@nestjs/common';
import { ICreateMenu, MenuRepository } from './repositories/menu-repository';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(private menuRepositoru: MenuRepository) {}
  async create({ userId, name }: ICreateMenu) {
    const menu = await Menu.create(name, userId);

    return await this.menuRepositoru.create(menu);
  }

  // async findAll() {}

  // async findOne(id: string) {}

  // async update(id: string, updateUserDto: UpdateUserDto) {}

  // async findByEmail(email: FindByEmailDto) {}

  // async remove(id: string) {}
}
