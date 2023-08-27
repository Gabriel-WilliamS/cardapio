import { Controller, Post, Body, Request } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { IRequest } from 'global/types';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto, @Request() req: IRequest) {
    const menu = {
      userId: req.user.id,
      name: createMenuDto.name,
    };
    return this.menuService.create(menu);
  }

  // @Get('findByEmail')
  // findByEmail(@Body() findByEmailDto: FindByEmailDto) {
  //   return this.usersService.findByEmail(findByEmailDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
